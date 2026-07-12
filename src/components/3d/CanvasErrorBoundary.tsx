"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Keeps a WebGL/Three.js failure (common on memory-constrained mobile Safari)
 * contained to the 3D area instead of crashing the whole page to a blank screen.
 */
export default class CanvasErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
