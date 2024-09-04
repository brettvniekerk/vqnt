# vqnt

Very Quick Nest Template

## Auth

To implement a real auth protocol, replace `TempAuthClient` with a real client, and change the `auth.guard.ts` logic to consume that new client.

## Wipe Schema

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```
