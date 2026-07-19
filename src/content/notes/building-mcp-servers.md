---
title: "Building MCP Servers That Actually Work"
date: "2026-06-04"
tags: ["mcp", "ai", "python", "agentic"]
desc: "What I learned building SAGE and ComplyAIgent — the non-obvious parts of wiring LLMs to real APIs via MCP."
---

MCP (Model Context Protocol) is deceptively simple to start and deceptively hard to get right in production. Here's what two hackathon builds taught me.

## What MCP actually is

It's a protocol that lets LLMs call tools — functions you define — in a structured way. The model decides when and how to call them. You define the schema, the implementation, and the error handling.

The tricky part: the model is non-deterministic. It might call your tool with arguments you didn't expect. It might call the same tool three times. It might skip a tool entirely when you expected it to use it. Your server needs to handle all of this.

## Lesson 1: Type your inputs strictly

```python
from fastmcp import FastMCP
from pydantic import BaseModel, Field

mcp = FastMCP("sage")

class BuildWorkspaceInput(BaseModel):
    student_id: str = Field(description="BulSU student number, e.g. 2021-00123")
    semester: int   = Field(ge=1, le=2, description="Semester number (1 or 2)")
    year: int       = Field(ge=2020, le=2030, description="Academic year start")

@mcp.tool()
async def build_semester_workspace(input: BuildWorkspaceInput) -> dict:
    """Creates a Notion workspace for the given semester from CHED curriculum."""
    ...
```

Pydantic validation catches malformed inputs before they hit your actual logic. The model sees the validation error as a tool response and can retry with corrected inputs. Without this, you're debugging why the model passed `"first"` instead of `1` for the semester.

## Lesson 2: Return structured errors, not exceptions

```python
# Bad — the model sees a stack trace and gets confused
raise ValueError("Curriculum not found")

# Good — the model can reason about this and decide what to do
return {"ok": False, "error": "curriculum_not_found", "message": "No CHED curriculum found for BSCE 2026"}
```

The model can handle a structured error response gracefully. It cannot reliably interpret a Python traceback.

## Lesson 3: Idempotency matters

The model WILL call your tool more than once. If your tool creates a Notion page, creating it twice should be safe (upsert, not insert). If your tool charges a payment, it should be idempotent by design (check if already done).

SAGE checks if a workspace already exists before creating it. ComplyAIgent uses a database `ON CONFLICT DO UPDATE` to make policy ingestion idempotent.

## Lesson 4: Human-in-the-loop is not optional for high-stakes tools

`bantay` uses Auth0 CIBA for this. ComplyAIgent pauses the LangGraph workflow and waits for an approval event before executing a policy enforcement action.

The pattern:

```python
# In your LangGraph node
async def enforce_policy(state):
    if state["risk_level"] == "high":
        # pause and emit an event — external system picks it up
        await emit_approval_request(state["policy_id"])
        return {"__interrupt__": True}
    # low risk — execute directly
    return await apply_policy(state)
```

Don't skip this for anything that writes data, sends notifications, or makes irreversible changes.

## What I'd do differently

For SAGE, I would separate the "planner" LLM call (what to do?) from the "executor" tool calls (do it). Mixing them in one agent makes the trace hard to debug and the behavior hard to predict.

For ComplyAIgent, I would stub the LLM calls in tests from day one. Testing an agentic system without mocking the LLM is slow, expensive, and flaky.

The tooling is immature. The patterns are still emerging. Build small, test at every layer, and expect to throw away your first design.
