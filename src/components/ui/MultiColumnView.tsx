"use client";
import React, { useState, useMemo } from "react";
import { Flex, Button, Heading, Separator, Box } from "@radix-ui/themes";
import { Virtuoso } from "react-virtuoso";

export interface ColumnDef<T> {
    key: string;
    title: string;
    data: T[];
    headerAction?: React.ReactNode;
}

interface MultiColumnViewProps<T> {
    columns: ColumnDef<T>[];
    renderItem: (item: T) => React.ReactNode;
    isLoading: boolean;
    renderSkeleton: () => React.ReactNode;
    skeletonCount?: number;
}

export function MultiColumnView<T>({
    columns,
    renderItem,
    isLoading,
    renderSkeleton,
    skeletonCount = 5,
}: MultiColumnViewProps<T>) {
    const [activeTab, setActiveTab] = useState(columns[0]?.key || "");

    const mobileContent = useMemo(() => (
        <div className="block lg:hidden p-4">
            <Flex direction="row" gap="2" mb="4" wrap="wrap">
                {columns.map((column) => (
                    <Button
                        key={column.key}
                        variant={activeTab === column.key ? "solid" : "outline"}
                        onClick={() => setActiveTab(column.key)}
                    >
                        {column.title}
                    </Button>
                ))}
            </Flex>
            {columns.map((column) => (
                activeTab === column.key && (
                    <div key={column.key} className="h-[70vh]">
                        <Flex justify="between" align="center" mb="2">
                            <Heading size="4" trim="start">
                                {column.title}
                            </Heading>
                            {column.headerAction}
                        </Flex>
                        <Separator my="3" size="4" />

                        {isLoading ? (
                            <Flex direction="column" gap="3">
                                {Array.from({ length: skeletonCount }).map((_, i) => (
                                    <React.Fragment key={i}>
                                        {renderSkeleton()}
                                    </React.Fragment>
                                ))}
                            </Flex>
                        ) : (
                            <Virtuoso
                                style={{ height: '100%' }}
                                data={column.data}
                                itemContent={(_index, item) => (
                                    <div className="pb-3">
                                        {renderItem(item)}
                                    </div>
                                )}
                            />
                        )}
                    </div>
                )
            ))}
        </div>
    ), [columns, activeTab, isLoading, renderSkeleton, skeletonCount, renderItem]);

    const desktopContent = useMemo(() => (
        <div className="hidden lg:block w-full h-[calc(100vh-140px)] overflow-hidden">
            <div className={`grid grid-cols-${columns.length} gap-4 h-full pr-1 pb-1`} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
                {columns.map((column) => (
                    <Flex key={column.key} direction="column" className="h-full overflow-hidden border border-gray-800/30 rounded-xl bg-gray-950/20 p-4">
                        <Box mb="4" flexShrink="0">
                            <Flex justify="between" align="center" mb="2">
                                <Heading size="4" trim="start">
                                    {column.title}
                                </Heading>
                                {column.headerAction}
                            </Flex>
                            <Separator size="4" />
                        </Box>
                        <div className="flex-1 overflow-hidden">
                            {isLoading ? (
                                <div className="overflow-y-auto h-full pr-2">
                                    <Flex direction="column" gap="3">
                                        {Array.from({ length: skeletonCount + 1 }).map((_, i) => ( // +1 for desktop to fill more space potentially
                                            <React.Fragment key={i}>
                                                {renderSkeleton()}
                                            </React.Fragment>
                                        ))}
                                    </Flex>
                                </div>
                            ) : (
                                <Virtuoso
                                    style={{ height: '100%' }}
                                    data={column.data}
                                    itemContent={(index, item) => (
                                        <div className="pb-3 pr-2">
                                            {renderItem(item)}
                                        </div>
                                    )}
                                />
                            )}
                        </div>
                    </Flex>
                ))}
            </div>
        </div>
    ), [columns, isLoading, renderSkeleton, skeletonCount, renderItem]);

    return (
        <>
            {mobileContent}
            {desktopContent}
        </>
    );
}
