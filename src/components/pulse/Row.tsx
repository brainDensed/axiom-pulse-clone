import { formatCurrency } from "@/lib/format";
import { PulseToken } from "./types";
import { Flex, Text, Tooltip, Theme } from "@radix-ui/themes";
import {
  PersonIcon,
  RocketIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { memo, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { openModal, openBuyModal } from "@/store/pulseSlice";
import { TokenCard, TokenStat } from "@/components/ui/TokenCard";

const getAge = (seconds: number) => Math.floor(seconds / 60);

function Row({ token }: { token: PulseToken }) {
  const dispatch = useDispatch();

  const handleRowClick = useCallback(() => {
    dispatch(openModal({ id: token.id, initialData: token }));
  }, [dispatch, token]);

  const handleBuyClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(openBuyModal({ id: token.id, initialData: token }));
    },
    [dispatch, token]
  );

  const stats: TokenStat[] = useMemo(
    () => [
      {
        label: "MCap",
        value: formatCurrency(token.marketCap),
        isCurrency: true,
        rawValue: token.marketCap,
        flashColor: "var(--gray-12)",
      },
      {
        label: "Liq",
        value: formatCurrency(token.liquidity),
        isCurrency: true,
        rawValue: token.liquidity,
        flashColor: "var(--accent-9)", // blue
      },
      {
        label: "Vol",
        value: formatCurrency(token.volume),
        isCurrency: true,
        highlightColor: "orange",
      },
    ],
    [token.marketCap, token.liquidity, token.volume]
  );

  const footerContent = (
    <>
      <Flex gap="3" align="center">
        <Theme appearance="dark">
          <Tooltip content="Holders" side="bottom">
            <Flex align="center" gap="1.5">
              <PersonIcon width="14" height="14" color="var(--gray-9)" />
              <Text size="1" color="gray" style={{ fontSize: "11px" }}>
                {token.holders}
              </Text>
            </Flex>
          </Tooltip>
        </Theme>
        <Theme appearance="dark">
          <Tooltip content="Migrations" side="bottom">
            <Flex align="center" gap="1.5">
              <RocketIcon width="14" height="14" color="var(--gray-9)" />
              <Text size="1" color="gray" style={{ fontSize: "11px" }}>
                {token.migrations}
              </Text>
            </Flex>
          </Tooltip>
        </Theme>
      </Flex>

      <Text size="1" color="gray" weight="medium" style={{ fontSize: "11px" }}>
        TX:{" "}
        <Text color="gray" highContrast>
          {token.txCount}
        </Text>
      </Text>
    </>
  );

  return (
    <TokenCard
      name={token.name}
      symbol={token.symbol}
      age={`${getAge(token.ageSeconds)}m ago`}
      stats={stats}
      footerContent={footerContent}
      onClick={handleRowClick}
      actionIcon={<LightningBoltIcon width="20" height="20" />}
      onActionClick={handleBuyClick}
    />
  );
}

export default memo(Row);
