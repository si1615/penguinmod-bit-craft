(function(Scratch) {
    'use strict';

    class BitConverterExtension {
        getInfo() {
            return {
                id: 'bitConverterExt',
                name: 'Bit Converter',
                color1: '#4C6EF5', 
                color2: '#364FC7', 
                blocks: [
                    {
                        opcode: 'convertBits',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[TYPE] [BITS] bit of [VALUE]',
                        arguments: {
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'typeMenu',
                                defaultValue: 'unsigned'
                            },
                            BITS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 16
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    }
                ],
                menus: {
                    typeMenu: {
                        acceptReporters: true, // Allows variables and reporters to drop into the menu
                        items: ['signed', 'unsigned']
                    }
                }
            };
        }

        convertBits(args) {
            let val = Math.trunc(Number(args.VALUE)) || 0;
            let bits = Math.max(1, Math.min(32, Math.trunc(Number(args.BITS)) || 16));
            const maxRange = Math.pow(2, bits);

            // Normalize input to determine if it means 'signed' or 'unsigned'
            let isSigned = false;
            let typeInput = args.TYPE;

            // Handle strings, booleans, and numbers
            if (typeof typeInput === 'string') {
                typeInput = typeInput.trim().toLowerCase();
                if (typeInput === 'true' || typeInput === '1' || typeInput === 'signed') {
                    isSigned = true;
                }
            } else if (typeof typeInput === 'number') {
                if (typeInput === 1) isSigned = true;
            } else if (typeof typeInput === 'boolean') {
                if (typeInput === true) isSigned = true;
            }

            if (!isSigned) {
                // Unsigned Math (0, false, 'unsigned')
                let unsignedVal = val % maxRange;
                if (unsignedVal < 0) {
                    unsignedVal += maxRange;
                }
                return unsignedVal;
            } else {
                // Signed Math (1, true, 'signed')
                let unsignedVal = val % maxRange;
                if (unsignedVal < 0) {
                    unsignedVal += maxRange;
                }
                const halfRange = maxRange / 2;
                if (unsignedVal >= halfRange) {
                    return unsignedVal - maxRange;
                }
                return unsignedVal;
            }
        }
    }

    Scratch.extensions.register(new BitConverterExtension());
})(Scratch);
