"use client";

import { Box, Button, Dialog, Flex, Text, TextField, Spinner } from "@radix-ui/themes";
import { useTokenDetails } from "@/hooks/queries/useTokenDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { closeBuyModal } from "@/store/pulseSlice";
import { useState } from "react";

export default function BuyModal() {
    const dispatch = useDispatch();
    const activeTokenId = useSelector((state: RootState) => state.pulse.buyModalTokenId);
    const idToFetch = activeTokenId || "";
    const isOpen = !!activeTokenId;

    const { data: token } = useTokenDetails(idToFetch, undefined);
    const [amount, setAmount] = useState("");

    if (!isOpen) return null;

    const handleBuy = () => {
        // Implement buy logic here (e.g., call API or smart contract)
        console.log(`Buying ${amount} SOL of ${token?.symbol}`);
        dispatch(closeBuyModal());
        setAmount("");
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && dispatch(closeBuyModal())}>
            <Dialog.Content style={{ maxWidth: 400 }}>
                {!token ? (
                    <Flex justify="center" p="4"><Spinner /></Flex>
                ) : (
                    <>
                        <Dialog.Title>Buy {token.name} ({token.symbol})</Dialog.Title>
                        <Dialog.Description size="2" mb="4" color="gray">
                            Enter the amount of SOL you want to spend.
                        </Dialog.Description>

                        <Flex direction="column" gap="4">
                            <Box>
                                <Text size="2" mb="1" weight="bold" as="div">
                                    Amount (SOL)
                                </Text>
                                <TextField.Root
                                    placeholder="0.0"
                                    type="number"
                                    value={amount}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                                >
                                    <TextField.Slot side="right" pr="2">
                                        SOL
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>

                            <Flex justify="end" gap="3">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Button onClick={handleBuy}>
                                    Buy with SOL
                                </Button>
                            </Flex>
                        </Flex>
                    </>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
}
