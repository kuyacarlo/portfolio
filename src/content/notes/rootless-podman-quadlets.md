---
title: "Why We Run Rootless Podman Quadlets Instead of Root Docker"
date: "2026-10-06"
tags: ["linux", "containers", "podman", "devops", "homelab"]
desc: "How systemd Quadlet units eliminate the privileged Docker daemon, automate boot lifecycle, and secure homelab services."
---

Most self-hosting guides tell you to install Docker, add your user to the `docker` group, and run `docker compose up -d`.

Here is the problem: adding a user to the `docker` group is effectively granting root privileges on the host without `sudo`. If an attacker breaks out of a container managed by a root Docker daemon, they own your machine. Furthermore, managing auto-start across unexpected reboots requires writing awkward cron jobs or wrapper scripts.

In our homelab and production workflows, we run **Rootless Podman with Quadlets**.

---

## What is a Podman Quadlet?

Quadlet is a built-in systemd generator in Podman. Instead of managing containers through a long-running background daemon, Quadlet lets you define containers as declarative **systemd service units**.

When systemd reloads, Quadlet automatically parses `.container` files in `~/.config/containers/systemd/` and translates them directly into native systemd service files.

---

## Why Rootless Quadlets Beat Docker

### 1. True Non-Root User Namespaces
Containers run entirely under an unprivileged user namespace using `subuid` and `subgid` mappings (`userns=auto`). Root inside the container is mapped to an unprivileged UID (e.g. UID 100000) on the host. A container breakout cannot compromise the host OS.

### 2. Native Systemd Supervision & Dependency Graphs
Because containers are native systemd units, you get the full power of Linux service management for free:
- Automatic restart on failure: `Restart=always`
- Dependency ordering: `After=network-online.target`
- System journal integration: `journalctl --user -u vaultwarden.service -f`
- Standard control: `systemctl --user restart forgejo`

### 3. Lingering User Sessions
To ensure non-root containers start automatically at host boot without waiting for an SSH login, enable user lingering:

```bash
loginctl enable-linger kaoru
```

---

## Example: Declarative Vaultwarden `.container` Unit

Save this as `~/.config/containers/systemd/vaultwarden.container`:

```ini
[Unit]
Description=Vaultwarden Password Manager
After=network-online.target

[Container]
Image=docker.io/vaultwarden/server:latest
ContainerName=vaultwarden
AutoUpdate=registry
PublishPort=127.0.0.1:8080:80
Volume=%h/.local/share/vaultwarden:/data:Z
Environment=SIGNUPS_ALLOWED=false

[Service]
Restart=always
TimeoutStartSec=300

[Install]
WantedBy=default.target
```

Reload systemd and start the container:

```bash
systemctl --user daemon-reload
systemctl --user start vaultwarden.service
```

---

## The Takeaway

No root daemon. No attack vector. Pure declarative systemd configuration as code.
