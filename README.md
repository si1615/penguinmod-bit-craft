# PenguinMod Bit Craft Extension

A custom PenguinMod extension designed to handle precise binary data simulation. This extension allows developers to enforce custom integer bit-depths and simulate native hardware overflows directly within block-based code.

## Description

By default, PenguinMod and Scratch treat all variables as standard high-precision floating-point numbers or strings. This makes it difficult to simulate low-level computer logic, game console registers, network packet buffers, or save-file structures.

**Bit Craft** bridges this gap by introducing a reporter block that forces any number or variable to conform to a specific bit width (from 1 to 32 bits). It perfectly simulates how hardware handles data overflow using two's complement math for signed numbers and wrap-around logic for unsigned numbers.

## Features

* **Dynamic Bit Selection:** Convert variables into custom sizes like 8-bit (Bytes), 16-bit (Shorts/uShorts), or any custom bit width up to 32-bit.
* **Flexible Input Typing:** The type dropdown slot accepts reporters. You can toggle between signed and unsigned behaviors using explicit text strings, booleans, or binary flags:
  * **Unsigned:** Triggers on `unsigned`, `0`, or `false`.
  * **Signed:** Triggers on `signed`, `1`, or `true`.
* **Accurate Overflow Simulation:** Handles both positive and negative value overflows exactly like real CPU registers.

## Usage Example

```scratch
[unsigned v] (16) bit of (70000) // Returns 4464 (uShort overflow simulation)
[signed v] (8) bit of (130)     // Returns -126 (Signed byte overflow simulation)
```

## Installation From Link
1. Copy ```https://raw.githubusercontent.com/si1615/penguinmod-bit-craft/refs/heads/main/penguinmod-bit-craft-ext.js```
2. Open your project in [PenguinMod](https://penguinmod.com).
3. Open the **Extensions** menu and click **Load Custom Extension**.
4. Switch to the **URL** tab if you aren't on it already
5. Paste the URL you copied
6. **IMPORTANT Check run unsandboxed as if you do not it will not work**
7. Click Load
8. **Enjoy!**

## Made By Me and Google AI Mode becuse i wanted to make a nes emulator
