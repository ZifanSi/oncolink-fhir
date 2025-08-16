# OncoFlow — Automated Oncology Care Workflows to Reduce Treatment Delays

In Canada, delays in cancer care are often caused not by lack of medical expertise, but by **inefficient administrative workflows**: slow referrals, manual scheduling, and disconnected health systems.  
OncoSynapse is a FHIR-native, microservices-based platform that **automates and coordinates oncology workflows** from initial biopsy to treatment initiation.

---

## Problem Statement

The median wait time from cancer suspicion to treatment in Canada can exceed national targets by several weeks.  
Root causes include:
- Paper or fax-based referrals.
- Multiple disconnected scheduling systems.
- Lack of real-time data exchange between departments.

---

## Workflow Scope

OncoSynapse automates:
1. **Biopsy Intake**  
   - Ingests pathology reports (FHIR DiagnosticReport) from labs.  
   - Triggers automated referral generation.

2. **Referral Management**  
   - Routes referrals to the correct oncology department.  
   - Tracks referral status in real-time.

3. **Treatment Scheduling**  
   - Integrates with hospital scheduling systems.  
   - Matches patient availability with clinician resources.

4. **Ongoing Monitoring**  
   - Tracks wait times for each step.  
   - Generates alerts if clinical time targets are at risk.

---

## Core Features

**Automated Workflow Orchestration**  
Event-driven system that moves patient cases forward without manual intervention.

**Interoperability via FHIR R4**  
Standardized APIs for exchanging patient, referral, and scheduling data across EMRs.

**Role-Specific Interfaces**  
Custom dashboards for:
- Clinicians (case review, decision-making)
- Schedulers (resource allocation, booking)
- Administrators (wait time analytics, bottleneck tracking)

**Real-Time Notifications**  
Automatic alerts for urgent cases, missed milestones, or required approvals.

**Performance Tracking**  
End-to-end analytics for median time between biopsy, referral, and treatment.


