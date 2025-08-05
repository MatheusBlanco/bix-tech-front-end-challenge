import { themeColors } from "@/styles/theme";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  background: linear-gradient(
    90deg,
    ${themeColors.surface} 0%,
    ${themeColors.outline}40 50%,
    ${themeColors.surface} 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${(props) => props.borderRadius || "8px"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
`;

export const Skeleton = styled(SkeletonBase)``;

export const SkeletonCard = styled.div`
  background: ${themeColors.surface};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${themeColors.outline};
  margin-bottom: 24px;
`;

export const SkeletonChart = styled(SkeletonBase)`
  height: 240px;
  border-radius: 12px;
`;

export const SkeletonText = styled(SkeletonBase)<{ lines?: number }>`
  height: 16px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
    width: 60%;
  }
`;

export const SkeletonTitle = styled(SkeletonBase)`
  height: 24px;
  width: 200px;
  margin-bottom: 16px;
`;

export const SkeletonStats = styled(SkeletonBase)`
  height: 120px;
  border-radius: 20px;
  margin-bottom: 32px;
`;
