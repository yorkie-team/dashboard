# Design Documents

New design documents should be based on [TEMPLATE.md](TEMPLATE.md).

## Contents

- [File Structure](file-structure.md): Project file structure documentation
- [RPC Error Handling](rpc-error-handling.md): Error handling design

## Guidelines

For significant scope and complex new features, it is recommended to write a
Design Document before starting any implementation work. On the other hand, we
don't need to design documentation for small, simple features and bug fixes.

Writing a design document for big features has many advantages:

- It helps new visitors or contributors understand the inner workings or the
  architecture of the project.
- We can agree with the community before code is written that could waste effort
  in the wrong direction.

While working on your design, writing code to prototype your functionality may
be useful to refine your approach.

Authoring Design document is also proceeded in the same
[contribution flow](../../CONTRIBUTING.md) as normal Pull Request such as
function implementation or bug fixing.
