## Objective

Public api is available here: https://api.metiundo.de/docs. This API allows an authenticated user to list all the meters (we also call them metering points) that this user has access to. The API further allows you to request all readings for a specific meter within a specified time window.

a user that has access to a single electricity meter that every 15 minutes records the total active energy consumed. Further information about what exactly is measured: https://onemeter.com/docs/device/obis/.

Typescript script to print out:
1. The overall electricity consumption (in kWh) for the month of July 2023
2. The maximum power (in kW) that was measured in the same month
