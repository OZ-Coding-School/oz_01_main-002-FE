'use client';

import FinalModal from "./FinalModal";
type ModalContainerProps = {
  itemStatus: boolean | undefined;
  active: string;
  auctionId: string | undefined;
  itemRefetch: () => void;
};
const ModalContainer = ({ itemStatus, active, auctionId, itemRefetch }: ModalContainerProps) => {
  console.log('경매상태', active);
  return (
    <>
      {active === '경매종료' ? < FinalModal auctionId={auctionId} itemRefetch={itemRefetch} /> : null}
    </>
  )
}

export default ModalContainer