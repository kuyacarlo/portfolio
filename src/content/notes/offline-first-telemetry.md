---
title: "Designing Offline-First Healthcare Telemetry with SQLite & Protocol Buffers"
date: "2026-10-06"
tags: ["architecture", "iot", "healthcare", "sqlite", "protobuf"]
desc: "Architectural patterns for reliable vital-sign data collection and device-to-device clinical handoffs in zero-connectivity environments."
---

Most modern digital health architectures are designed around continuous cloud APIs: a wearable captures biometric telemetry and sends HTTPS JSON requests to a managed cloud database.

In emerging market community healthcare—such as rural Philippine barangays—this architectural assumption fails immediately. Barangay Health Workers (BHWs) conduct home visits in areas with zero cell connectivity, using budget Android devices on prepaid data.

When designing the telemetry architecture for **Kasigla**, we discarded cloud-first assumptions and engineered an **offline-first, device-to-device handoff protocol**.

---

## The Core Technical Constraints

1. **Zero Internet Dependency**: Recording vitals (systolic, diastolic, heart rate) and reviewing patient history must work completely offline.
2. **Deterministic Payload Serialization**: Transferring records between a patient phone and a BHW tablet over local connections (Bluetooth LE / Wi-Fi Direct) requires compact, typed schemas with zero JSON parsing overhead.
3. **Structured Clinical Handoff**: Records must export cleanly into standardized CSV / FHIR formats for Rural Health Unit (RHU) reporting.

---

## 1. Local Storage: Embedded SQLite over Browser KV

Instead of relying on fragile browser `localStorage` or heavy cloud ORMs, each client node operates an embedded **SQLite database**.

```sql
CREATE TABLE IF NOT EXISTS readings (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL,
    heart_rate INTEGER,
    measured_at TIMESTAMP NOT NULL,
    measured_by TEXT NOT NULL,
    notes TEXT,
    synced_at TIMESTAMP
);
```

SQLite guarantees ACID transactions on low-power devices and allows complex historical queries (e.g. 30-day moving average blood pressure) without cloud round-trips.

---

## 2. Binary Serialization: Protocol Buffers for D2D Transfer

For device-to-device record handoffs, JSON payloads are bulky and non-deterministic. We define strict Protocol Buffer schemas:

```protobuf
syntax = "proto3";

package kasigla.telemetry;

message VitalReading {
  string id = 1;
  string patient_id = 2;
  int32 systolic = 3;
  int32 diastolic = 4;
  int32 heart_rate = 5;
  int64 timestamp_utc = 6;
  string recorder_role = 7;
}

message PatientHandoffBatch {
  string patient_id = 1;
  repeated VitalReading records = 2;
  string integrity_hash = 3;
}
```

Protobuf payloads are 70% smaller than JSON and guarantee type safety across web (Astro/Wasm), mobile (Flutter), and embedded microcontrollers (ESP32).

---

## 3. The Human-in-the-Loop Confirmation Gate

In distributed offline healthcare, silent background synchronization causes synchronization conflicts and lost clinical context. 

We enforce an **explicit visual confirmation step**:
1. Patient device generates a single-patient handoff batch.
2. BHW device receives and validates the integrity checksum.
3. BHW reviews the delta on-screen and taps **"Accept & File to RHU Queue"**.
4. Both devices record the local receipt signature.

---

## The Takeaway

Good software engineering in emerging markets is not about adding more cloud infrastructure; it is about building software that survives the physical reality of the edge.
