"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Text, Button, Flex } from "@radix-ui/themes";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box className="p-4 rounded-lg bg-red-900/20 border border-red-800 m-4">
                    <Flex direction="column" gap="3" align="center">
                        <Text color="red" weight="bold">Something went wrong</Text>
                        <Text size="2" color="gray">{this.state.error?.message}</Text>
                        <Button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            variant="soft"
                            color="red"
                        >
                            Try again
                        </Button>
                    </Flex>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
