"use client";
import { formatMarketCap } from "@/lib/format";
import { PulseToken } from "./types";
import { Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState, memo } from "react";

function Row({ token }: { token: PulseToken }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card size="2" style={{ backgroundColor: 'rgba(17, 24, 39, 0.4)', borderColor: 'rgba(31, 41, 55, 1)' }}>
      <Flex direction="column" gap="3">
        {/* Header section with Image, Name, Symbol and Age */}
        <Flex align="start" justify="between" gap="3">
          <Flex align="center" gap="3" style={{ flex: 1, minWidth: 0 }}>
            <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-800 flex items-center justify-center">
              {!imgError ? (
                <Image
                  src={token.image}
                  alt={token.symbol}
                  fill
                  className="object-cover"
                  sizes="40px"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Text size="2" weight="bold" color="gray">{token.symbol[0]}</Text>
              )}
            </div>

            <Box style={{ minWidth: 0 }}>
              <Flex align="center" gap="2">
                <Text weight="bold" size="2" color="gray" highContrast className="truncate">
                  {token.name}
                </Text>
                <Text size="1" color="gray" className="truncate uppercase">
                  {token.symbol}
                </Text>
              </Flex>
              <Text size="1" color="blue" weight="medium">
                {Math.floor(token.ageSeconds / 60)}m ago
              </Text>
            </Box>
          </Flex>
        </Flex>

        {/* Main Stats Grid */}
        <Grid columns="3" gap="2">
          <Box className="bg-black/20 rounded-lg p-2 border border-gray-800/50">
            <Text as="div" size="1" color="gray" weight="medium" className="uppercase tracking-wider mb-0.5">MCap</Text>
            <Text as="div" size="2" weight="bold" style={{ color: 'var(--jade-9)' }}>${formatMarketCap(token.marketCap)}</Text>
          </Box>
          <Box className="bg-black/20 rounded-lg p-2 border border-gray-800/50">
            <Text as="div" size="1" color="gray" weight="medium" className="uppercase tracking-wider mb-0.5">Liq</Text>
            <Text as="div" size="2" weight="bold" color="blue">${formatMarketCap(token.liquidity)}</Text>
          </Box>
          <Box className="bg-black/20 rounded-lg p-2 border border-gray-800/50">
            <Text as="div" size="1" color="gray" weight="medium" className="uppercase tracking-wider mb-0.5">Vol</Text>
            <Text as="div" size="2" weight="bold" color="orange">${formatMarketCap(token.volume)}</Text>
          </Box>
        </Grid>

        {/* Secondary Details */}
        <Flex align="center" justify="between" px="1">
          <Flex align="center" gap="3">
            <Flex align="center" gap="1" title="Holders">
              <PersonIcon width="14" height="14" color="var(--gray-10)" />
              <Text size="1" color="gray">{token.holders}</Text>
            </Flex>
            <Flex align="center" gap="1" title="Migrations">
              <RocketIcon width="14" height="14" color="var(--gray-10)" />
              <Text size="1" color="gray">{token.migrations}</Text>
            </Flex>
          </Flex>
          <Text size="1" color="gray" weight="medium">
            TX: <Text color="gray" highContrast>{token.txCount}</Text>
          </Text>
        </Flex>

        {/* Action Button */}
        <Button size="2" variant="solid" style={{ width: '100%', fontWeight: 600 }}>
          0 SOL
        </Button>
      </Flex>
    </Card>
  );
}

export default memo(Row);
