import {
  SkeletonCard,
  SkeletonChart,
  SkeletonStats,
  SkeletonText,
  SkeletonTitle,
} from "@/components/ui/Skeleton";
import styled from "styled-components";
import { ChartsGrid } from "../ChartsGrid";

const SkeletonsRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const SkeletonCol = styled.div`
  min-width: 150px;
`;

export const Skeletons = () => {
  return (
    <>
      <SkeletonCard>
        <SkeletonTitle />
        <SkeletonsRow>
          <SkeletonCol>
            <SkeletonText height="12px" width="60px" />
            <SkeletonText height="40px" />
          </SkeletonCol>
          <SkeletonCol>
            <SkeletonText height="12px" width="80px" />
            <SkeletonText height="40px" />
          </SkeletonCol>
          <SkeletonCol>
            <SkeletonText height="12px" width="70px" />
            <SkeletonText height="40px" />
          </SkeletonCol>
          <SkeletonCol>
            <SkeletonText height="12px" width="50px" />
            <SkeletonText height="40px" />
          </SkeletonCol>
        </SkeletonsRow>
      </SkeletonCard>

      <SkeletonStats />

      <ChartsGrid>
        <SkeletonCard>
          <SkeletonTitle width="180px" />
          <SkeletonChart />
        </SkeletonCard>
        <SkeletonCard>
          <SkeletonTitle width="160px" />
          <SkeletonChart />
        </SkeletonCard>
        <SkeletonCard>
          <SkeletonTitle width="140px" />
          <SkeletonChart />
        </SkeletonCard>
      </ChartsGrid>
    </>
  );
};
