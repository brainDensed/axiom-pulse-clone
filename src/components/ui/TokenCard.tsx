"use client";
import React, { memo } from "react";
import { Box, Flex, Grid, Text, IconButton } from "@radix-ui/themes";
import { useDirectFlash } from "@/hooks/useDirectFlash";

export interface TokenStat {
  label: string;
  value: string | number;
  isCurrency?: boolean;
  highlightColor?: string;
  flashColor?: string;
  rawValue?: number;
}

export interface TokenCardProps {
  name: string;
  symbol: string;
  age?: string;
  stats: TokenStat[];
  footerContent?: React.ReactNode;
  onClick?: () => void;
  actionIcon?: React.ReactNode;
  onActionClick?: (e: React.MouseEvent) => void;
}

const StatBox = ({ stat }: { stat: TokenStat }) => {
  const { ref, style } = useDirectFlash(
    typeof stat.rawValue === "number" ? stat.rawValue : 0,
    stat.highlightColor || "var(--gray-12)"
  );

  if (typeof stat.rawValue === "number") {
    return (
      <Box className="bg-black/20 rounded-lg p-2 border border-gray-800/50">
        <Text
          as="div"
          size="1"
          color="gray"
          highContrast
          weight="medium"
          className="uppercase tracking-wider mb-0.5"
          style={{ fontSize: "10px" }}
        >
          {stat.label}
        </Text>
        <span
          ref={ref}
          style={stat.highlightColor ? { color: stat.highlightColor } : style}
          className="text-xs font-bold block"
        >
          {stat.isCurrency && "$"}
          {stat.value}
        </span>
      </Box>
    );
  } else {
    return (
      <Box className="bg-black/20 rounded-lg p-2 border border-gray-800/50">
        <Text
          as="div"
          size="1"
          color="gray"
          highContrast
          weight="medium"
          className="uppercase tracking-wider mb-0.5"
          style={{ fontSize: "10px" }}
        >
          {stat.label}
        </Text>
        <Text
          as="div"
          size="2"
          weight="bold"
          highContrast
          className="text-xs block"
          style={stat.highlightColor ? { color: stat.highlightColor } : {}}
        >
          {stat.isCurrency && "$"}
          {stat.value}
        </Text>
      </Box>
    );
  }
};

export const TokenCard = memo(function TokenCard({
  name,
  symbol,
  age,
  stats,
  footerContent,
  onClick,
  actionIcon,
  onActionClick,
}: TokenCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="p-3 rounded-lg bg-gray-900/40 border border-gray-800 hover:bg-gray-800 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Flex direction="column" gap="2">
        <Flex align="start" justify="between" gap="3">
          <Flex align="center" gap="3" style={{ flex: 1, minWidth: 0 }}>
            <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-md bg-gray-800 flex items-center justify-center">
              <Text size="1" weight="bold" color="gray">
                {symbol[0]}
              </Text>
            </div>

            <Box style={{ minWidth: 0 }}>
              <Flex align="center" gap="2">
                <Text
                  weight="bold"
                  size="2"
                  color="gray"
                  highContrast
                  className="truncate leading-tight"
                >
                  {name}
                </Text>
                <Text
                  size="1"
                  color="gray"
                  highContrast
                  className="truncate uppercase leading-tight"
                  style={{ fontSize: "11px", opacity: 0.8 }}
                >
                  {symbol}
                </Text>
              </Flex>
              {age && (
                <Text
                  size="1"
                  color="blue"
                  weight="medium"
                  highContrast
                  style={{ fontSize: "11px" }}
                >
                  {age}
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>

        <Grid columns="3" gap="2">
          {stats.map((stat, index) => (
            <StatBox key={index} stat={stat} />
          ))}
        </Grid>

        <Flex
          align="center"
          justify="between"
          px="1"
          pt="1"
          className="relative h-10"
        >
          {footerContent}

          {actionIcon && (
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <IconButton
                aria-label="Quick Buy"
                size="3"
                radius="full"
                variant="solid"
                color="cyan"
                className="shadow-lg hover:scale-105 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  onActionClick?.(e);
                }}
                style={{ width: "36px", height: "36px" }}
              >
                {actionIcon}
              </IconButton>
            </div>
          )}
        </Flex>
      </Flex>
    </div>
  );
});
