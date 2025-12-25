"use client";
import {
  FINAL_STRETCH_MOCK,
  MIGRATED_MOCK,
  NEW_PAIRS_MOCK,
} from "@/lib/mock/tokens";
import Row from "./Row";
import { Box, Button, Flex, Heading, Separator } from "@radix-ui/themes";
import { PulseColumnConfig } from "./types";
import { useState } from "react";

function Column() {
  const [activeTab, setActiveTab] = useState("new");
  const PULSE_COLUMN: PulseColumnConfig[] = [
    {
      key: "new",
      title: "New Pairs",
      data: NEW_PAIRS_MOCK,
    },
    {
      key: "final",
      title: "Final Stretch",
      data: FINAL_STRETCH_MOCK,
    },
    {
      key: "migrated",
      title: "Migrated",
      data: MIGRATED_MOCK,
    },
  ];
  return (
    <>
      {/* Mobile: Tabs */}
      <div className="block lg:hidden p-4">
        <Flex direction="row" gap="2" mb="4" wrap="wrap">
          {PULSE_COLUMN.map((column) => (
            <Button
              key={column.key}
              variant={activeTab === column.key ? "solid" : "outline"}
              onClick={() => setActiveTab(column.key)}
            >
              {column.title}
            </Button>
          ))}
        </Flex>
        {PULSE_COLUMN.map((column) => (
          activeTab === column.key && (
            <div key={column.key}>
              <Heading size="4" mb="2" trim="start">
                {column.title}
              </Heading>
              <Separator my="3" size="4" />
              <Flex direction="column" gap="3">
                <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
                  {column.data.map((token) => (
                    <Row key={token.id} token={token} />
                  ))}
                </div>
              </Flex>
            </div>
          )
        ))}
      </div>
      {/* Desktop: Side by side */}
      <div className="hidden lg:block w-full h-[calc(100vh-140px)] overflow-hidden">
        <div className="grid grid-cols-3 gap-4 h-full pr-1 pb-1">
          {PULSE_COLUMN.map((column) => (
            <Flex key={column.key} direction="column" className="h-full overflow-hidden border border-gray-800/30 rounded-xl bg-gray-950/20 p-4">
              <Box mb="4" flex-shrink="0">
                <Heading size="4" mb="2" trim="start">
                  {column.title}
                </Heading>
                <Separator size="4" />
              </Box>
              <div className="overflow-y-auto h-full pr-3 custom-scrollbar">
                <Flex direction="column" gap="3">
                  {column.data.map((token) => (
                    <Row key={token.id} token={token} />
                  ))}
                </Flex>
              </div>
            </Flex>
          ))}
        </div>
      </div>
    </>
  );
}
export default Column;
