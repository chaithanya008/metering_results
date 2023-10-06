## Objective

Our documentation for our public api is available here: https://api.metiundo.de/docs. This API allows an authenticated user to list all the meters (we also call them metering points) that this user has access to. The API further allows you to request all readings for a specific meter within a specified time window.

We will provide you with user credentials of a sample user that has access to a single electricity meter that every 15 minutes records the total active energy consumed. Further information about what exactly is measured: https://onemeter.com/docs/device/obis/.

Your task is to write a simple script using Typescript that utilises this API to gather needed data and ultimately print out:
1. The overall electricity consumption (in kWh) for the month of July 2023
2. The maximum power (in kW) that was measured in the same month

*Hint*: This repo contains types for the responses from the 3 endpoints you'll need to use to complete the task. The types aren't necessarily complete but contain all the properties of the response you'll need.

## Submission
Please clone the repo locally and implement your solution. When you are satisfied

1. Add all your changes to a single commit.
2. Use `git format-patch -1 HEAD` to create a patch.
3. Submit that patch to us via email.
