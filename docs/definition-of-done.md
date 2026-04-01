# Definition of Done

A Story is **done** when ALL of the following are true.

## Code Quality
- All acceptance criteria are met and verifiable
- No debug or diagnostic statements left in source code
- Code follows existing patterns in the codebase
- No obviously duplicated logic introduced

## Testing
- Automated tests written for all new utility functions and logic
- Automated tests written for all new UI components
- All existing tests still passing (no regressions)
- Edge cases and error paths tested
- For UI stories: manual tests completed and results documented

## Review
- PR opened with title including Jira ticket key (e.g. [PROJECT_KEY]-16)
- PR description includes what was built and how to test manually
- QA agent review completed and posted as a PR comment
- No open bugs linked to the story

## Jira
- Ticket moved to Done
- Final comment added confirming merge

---
*This document is the single source of truth for story completion.
All agents must verify work meets this standard before recommending
approval.*
