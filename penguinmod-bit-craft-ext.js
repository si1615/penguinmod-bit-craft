(function(Scratch) {
    'use strict';

    // Automatically check if the user is running unsandboxed
    // This removes the risk of the extension breaking silently
    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be run UNSANDBOXED! Please check 'Run unsandboxed' when loading the URL.");
        return;
    }

    class BitConverterExtension {
        getInfo() {
            return {
                id: 'bitConverterExt',
                name: 'Bit Craft',
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
                        acceptReporters: true, 
                        items: ['signed', 'unsigned']
                    }
                }
            };
        }

        convertBits(args) {
            let val = Math.trunc(Number(args.VALUE)) || 0;
            let bits = Math.max(1, Math.min(32, Math.trunc(Number(args.BITS)) || 16));
            const maxRange = Math.pow(2, bits);

            let isSigned = false;
            let typeInput = args.TYPE;

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
                let unsignedVal = val % maxRange;
                if (unsignedVal < 0) {
                    unsignedVal += maxRange;
                }
                return unsignedVal;
            } else {
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
