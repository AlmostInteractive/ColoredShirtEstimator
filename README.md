# Colored T-shirt Estimator
A tool that allows developers to estimate tickets according to risk and amount of work without subconsciously converting to time while still allowing Product the ability to create plans and forecasts based on team velocity.

### Status
MVP

### Usage
Input a number of tickets with a Color and Size.  Add a collection of tickets to a sprint.  Set how many dev hours were spent in the sprint.  Add a number of sprints.  Click "Compute Variables" to figure out roughly how many hours each type of ticket takes the team to complete.  Product can use those number to create future time estimates.

### Syntax
#### Colors
A measure of the risk and complexity of the ticket.  Is this code that touches a lot of other systems?  Are you integrating previously unused technology? Are there a lot of unknowns?  This measurement should be objective; it should be discussed and agreed upon by the devs.
- Green (lowest)
- Blue
- Yellow
- Orange
- Red (highest)

### Sizes
A measure of the amount of work the task takes to complete.  This measurement is subjective to each developer and teams can decide to either take the highest or the median subjective estimate from the devs' input.
- X-small (lowest)
- Small
- Medium
- Large
- X-large (highest)
