import { Box, Flex, Grid } from "@radix-ui/themes";

const SkeletonRow = () => {
    return (
        <div className="p-3 rounded-lg bg-gray-900/40 border border-gray-800 grayscale opacity-70">
            <Flex direction="column" gap="2">
                {/* Header Skeleton */}
                <Flex align="start" justify="between" gap="3">
                    <Flex align="center" gap="3" style={{ flex: 1 }}>
                        <div className="w-9 h-9 rounded-md bg-gray-800 animate-pulse" />
                        <Box style={{ flex: 1 }}>
                            <div className="h-3 w-24 bg-gray-800 rounded animate-pulse mb-1.5" />
                            <div className="h-2.5 w-12 bg-gray-800 rounded animate-pulse" />
                        </Box>
                    </Flex>
                </Flex>

                {/* Grid Skeleton */}
                <Grid columns="3" gap="2">
                    {[1, 2, 3].map((i) => (
                        <Box key={i} className="bg-black/20 rounded-lg p-2 border border-gray-800/50">
                            <div className="h-2 w-8 bg-gray-800 rounded animate-pulse mb-1" />
                            <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
                        </Box>
                    ))}
                </Grid>

                {/* Footer Skeleton with Center Button */}
                <Flex align="center" justify="between" px="1" pt="1" className="relative h-10">
                    <div className="flex gap-2">
                        <div className="h-3 w-8 bg-gray-800 rounded animate-pulse" />
                        <div className="h-3 w-8 bg-gray-800 rounded animate-pulse" />
                    </div>

                    {/* Center Circle */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-9 h-9 rounded-full bg-gray-800 animate-pulse" />
                    </div>

                    <div className="h-3 w-10 bg-gray-800 rounded animate-pulse" />
                </Flex>

            </Flex>
        </div>
    );
};

export default SkeletonRow;
