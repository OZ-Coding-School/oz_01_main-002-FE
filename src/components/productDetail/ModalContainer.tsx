"use client";

import FinalModal from "./FinalModal";
type ModalContainerProps = {
  itemStatus: boolean | undefined;
  active: string;
  auctionId: string | undefined;
  // itemRefetch: () => void;
};
const ModalContainer = ({
  itemStatus,
  active,
  auctionId,
}: ModalContainerProps) => {
  return (
    <>
      {active === "경매종료" ? (
        <FinalModal
          auctionId={auctionId}
          // itemRefetch={itemRefetch}
        />
      ) : null}
    </>
  );
};

export default ModalContainer;
