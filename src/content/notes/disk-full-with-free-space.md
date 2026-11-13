---
title: Disk full, with free space showing
dek: btrfs said ENOSPC. df said I had room. Both were telling the truth.
date: "[date]"
layers: [4]
tags: [btrfs, snapper]
---

## Symptom

Writes started failing with "No space left on device." `df -h` still showed plenty of free space, which is exactly the kind of answer that makes you stop trusting your tools.

## Cause

btrfs splits space into data chunks and metadata chunks. df mostly reports data. Every snapshot adds metadata, and snapper had been taking them on a timer. When I counted, there were 206. Metadata was full; data wasn't.

```
$ sudo btrfs filesystem usage /
$ sudo snapper list | wc -l
```

The first command shows data and metadata separately. That's the one to run before believing df.

## Fix

Delete old snapshots in one range, then rebalance so the freed chunks can be reused.

```
$ sudo snapper delete <first>-<last>
$ sudo btrfs balance start -dusage=50 /
```

## So it doesn't happen again

Tightened snapper's timeline limits so it keeps a handful, not hundreds. The real lesson: if a tool can quietly accumulate state, give it a ceiling the day you install it.

```
# /etc/snapper/configs/root
TIMELINE_LIMIT_HOURLY="…"
TIMELINE_LIMIT_DAILY="…"
TIMELINE_LIMIT_WEEKLY="…"
```
