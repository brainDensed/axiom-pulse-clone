"use client";
import React from "react";
import { MixerHorizontalIcon, ArrowUpIcon, ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { IconButton, Popover, Flex, Text, Button, Box } from "@radix-ui/themes";

export type SortKey = string; // Generic string keys

export type SortConfig = {
    key: SortKey;
    direction: "asc" | "desc";
};

export type SortOption = {
    label: string;
    key: SortKey;
};

type SortFilterProps = {
    activeSort: SortConfig;
    onSortChange: (sort: SortConfig) => void;
    options: SortOption[];
};


export const SortFilter: React.FC<SortFilterProps> = ({ activeSort, onSortChange, options }) => {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <IconButton variant="ghost" color="gray" size="2" aria-label="Sort options">
                    <MixerHorizontalIcon width="18" height="18" />
                </IconButton>
            </Popover.Trigger>
            <Popover.Content width="220px" style={{ padding: 0, overflow: 'hidden' }}>
                <Flex direction="column">
                    <Box p="3" className="bg-gray-2 border-b border-gray-4">
                        <Text size="2" weight="bold">Sort by</Text>
                    </Box>
                    <Flex direction="column" p="1">
                        {options.map((option) => {
                            const isActive = activeSort.key === option.key;
                            return (
                                <Flex
                                    key={option.key}
                                    align="center"
                                    justify="between"
                                    className={`
                                        rounded-md px-3 py-2 cursor-pointer transition-colors
                                        ${isActive ? 'bg-[var(--accent-3)]' : 'hover:bg-[var(--gray-3)]'}
                                    `}
                                    role="button"
                                    aria-label={`Sort by ${option.label}`}
                                    aria-pressed={isActive}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            onSortChange({ ...activeSort, key: option.key });
                                        }
                                    }}
                                    onClick={() => onSortChange({ ...activeSort, key: option.key })}
                                >
                                    <Text size="2" weight={isActive ? "medium" : "regular"} style={{ color: isActive ? 'var(--accent-11)' : 'var(--gray-11)' }}>
                                        {option.label}
                                    </Text>
                                    {isActive && <CheckIcon color="var(--accent-11)" />}
                                </Flex>
                            );
                        })}
                    </Flex>

                    <Flex p="2" gap="1" className="border-t border-gray-4 bg-gray-1">
                        <Button
                            variant={activeSort.direction === 'asc' ? 'soft' : 'surface'}
                            color={activeSort.direction === 'asc' ? undefined : 'gray'}
                            onClick={() => onSortChange({ ...activeSort, direction: 'asc' })}
                            style={{ flex: 1 }}
                            size="1"
                        >
                            <ArrowUpIcon /> Ascending
                        </Button>
                        <Button
                            variant={activeSort.direction === 'desc' ? 'soft' : 'surface'}
                            color={activeSort.direction === 'desc' ? undefined : 'gray'}
                            onClick={() => onSortChange({ ...activeSort, direction: 'desc' })}
                            style={{ flex: 1 }}
                            size="1"
                        >
                            <ArrowDownIcon /> Descending
                        </Button>
                    </Flex>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    );
};
