"use client";

import { Box, Button, Dialog, Flex, Grid, Text, Spinner } from "@radix-ui/themes";
import { RocketIcon } from "@radix-ui/react-icons";
import { formatCurrency } from "@/lib/format";
import { useTokenDetails } from "@/hooks/queries/useTokenDetails";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { closeModal, openBuyModal } from "@/store/pulseSlice";

const getAge = (seconds: number) => Math.floor(seconds / 60);

interface Stat {
    label: string;
    value: string | number | undefined;
    isCurrency: boolean;
    color?: "blue" | "orange" | "purple";
}

export default function TokenDetailModal() {
    const dispatch = useDispatch();
    const activeTokenId = useSelector((state: RootState) => state.pulse.activeTokenId);
    // Ensure we have a valid string ID, or skip the query if null (handled by useTokenDetails enabled logic if needed, but passing undefined/null usually requires care)
    const idToFetch = activeTokenId || "";
    const isOpen = !!activeTokenId;

    // Fetch only if we have an ID.
    const { data: token, isLoading } = useTokenDetails(idToFetch, undefined);

    const formattedData = useMemo(() => {
        if (!token) return null;
        return {
            age: `${getAge(token.ageSeconds)}m ago`,
            marketCap: formatCurrency(token.marketCap),
            liquidity: formatCurrency(token.liquidity),
            volume: formatCurrency(token.volume),
        };
    }, [token]);

    const displayToken = token;

    const stats: Stat[] = [
        { label: "Market Cap", value: formattedData?.marketCap, isCurrency: true },
        { label: "Liquidity", value: formattedData?.liquidity, isCurrency: true, color: "blue" },
        { label: "Volume", value: formattedData?.volume, isCurrency: true, color: "orange" },
        { label: "Age", value: formattedData?.age, isCurrency: false },
        { label: "Pro Traders", value: displayToken?.proTraders, isCurrency: false, color: "purple" },
        { label: "Holders", value: displayToken?.holders, isCurrency: false },
    ];

    // If not open, we don't need to render the dialog content logic
    if (!isOpen) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && dispatch(closeModal())}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                {!displayToken ? (
                    <Flex justify="center" p="4"><Spinner /></Flex>
                ) : (
                    <>
                        <Flex align="center" gap="3" mb="4">
                            <Dialog.Title style={{ margin: 0 }}>
                                {displayToken.name} ({displayToken.symbol})
                            </Dialog.Title>
                            {isLoading && <Spinner />}
                        </Flex>

                        <Dialog.Description size="2" mb="4" color="gray">
                            Token Details and Statistics
                        </Dialog.Description>

                        <Flex direction="column" gap="4">
                            <Grid columns="2" gap="3">
                                {stats.map((stat) => (
                                    <Box key={stat.label} className="p-3 bg-gray-3 rounded-md">
                                        <Text size="1" color="gray" weight="bold" className="uppercase">
                                            {stat.label}
                                        </Text>
                                        <Text as="div" size="5" weight="bold" {...(stat.color ? { color: stat.color } : {})}>
                                            {stat.isCurrency ? "$" : ""}{stat.value}
                                        </Text>
                                    </Box>
                                ))}
                            </Grid>

                            <Box>
                                <Text size="2" weight="bold" mb="2" as="div">
                                    Other Metrics
                                </Text>
                                <Flex gap="4" wrap="wrap">
                                    <Flex align="center" gap="2">
                                        <RocketIcon />
                                        <Text size="2">{displayToken.migrations} Migrations</Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Text size="2" weight="bold">
                                            TX:
                                        </Text>
                                        <Text size="2">{displayToken.txCount}</Text>
                                    </Flex>
                                </Flex>
                            </Box>

                            <Box className="p-2 bg-black/20 rounded border border-gray-800/30">
                                <Text size="1" color="gray" className="uppercase font-mono">
                                    ID: {displayToken.id}
                                </Text>
                            </Box>

                            <Flex gap="3" mt="2" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Close
                                    </Button>
                                </Dialog.Close>
                                <Button size="2" variant="solid" style={{ fontWeight: 600 }} onClick={() => dispatch(openBuyModal({ id: displayToken.id, initialData: displayToken }))}>
                                    Buy 0 SOL
                                </Button>
                            </Flex>
                        </Flex>
                    </>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
}
