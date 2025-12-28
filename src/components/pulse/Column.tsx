"use client";
import { useEffect, useState, useMemo, memo, useCallback, startTransition } from "react";
import { pulseState, subscribe } from "@/lib/mock/stream";
import { PulseToken } from "./types";
import { setSort } from "@/store/pulseSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Row from "./Row";
import { SortFilter, SortConfig } from "@/components/shared/SortFilter";
import TokenDetailModal from "./TokenDetailModal";
import SkeletonRow from "@/components/shared/SkeletonRow";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MultiColumnView } from "../ui/MultiColumnView";
import BuyModal from "@/components/shared/BuyModal";

const Column = memo(function Column() {
  const [pulseData, setPulseData] = useState<pulseState | null>(null);

  const dispatch = useDispatch();

  const sorts = useSelector((state: RootState) => state.pulse.sorts);

  const handleSortChange = useCallback((columnId: string, newConfig: SortConfig) => {
    dispatch(setSort({ columnId, key: newConfig.key, direction: newConfig.direction }));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = subscribe((data) => {
      startTransition(() => {
        setPulseData(data);
      });
    });
    return () => unsubscribe();
  }, [])


  const sortTokens = useCallback((tokens: PulseToken[], config: { key: string, direction: 'asc' | 'desc' } | undefined) => {
    if (!config) return tokens;

    return [...tokens].sort((a, b) => {
      const aValue = a[config.key as keyof PulseToken];
      const bValue = b[config.key as keyof PulseToken];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return config.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, []);

  const sortOptions = useMemo(() => [
    { label: "Market Cap", key: "marketCap" },
    { label: "Liquidity", key: "liquidity" },
    { label: "Volume", key: "volume" },
    { label: "Age", key: "ageSeconds" },
    { label: "Transactions", key: "txCount" },
    { label: "Holders", key: "holders" },
    { label: "Pro Traders", key: "proTraders" },
  ], []);

  const columnsData = useMemo(() => [
    {
      key: "new",
      title: "New Pairs",
      data: pulseData ? sortTokens(pulseData.newPairs, sorts['new']) : []
    },
    {
      key: "final",
      title: "Final Stretch",
      data: pulseData ? sortTokens(pulseData.finalStretch, sorts['final']) : []
    },
    {
      key: "migrated",
      title: "Migrated",
      data: pulseData ? sortTokens(pulseData.migrated, sorts['migrated']) : []
    },
  ], [pulseData, sortTokens, sorts]);

  const columns = useMemo(() => columnsData.map(col => ({
    ...col,
    headerAction: sorts[col.key] ? (
      <SortFilter
        activeSort={{ key: sorts[col.key].key as SortConfig['key'], direction: sorts[col.key].direction }}
        onSortChange={(newConfig) => handleSortChange(col.key, newConfig)}
        options={sortOptions}
      />
    ) : null
  })), [columnsData, sorts, handleSortChange, sortOptions]);

  return (
    <>
      <ErrorBoundary>
        <MultiColumnView
          columns={columns}
          renderItem={(token: PulseToken) => <Row token={token} />}
          isLoading={!pulseData}
          renderSkeleton={() => <SkeletonRow />}
          skeletonCount={6}
        />
        <TokenDetailModal />
        <BuyModal />
      </ErrorBoundary>
    </>
  );
});

export default Column;
