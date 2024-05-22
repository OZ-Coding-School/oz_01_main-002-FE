'use client';

import { useBiddingStore } from "@/store";
import FinalModal from "./FinalModal";

const ModalContainer = () => {
  const { isBidding } = useBiddingStore();
  return (
    <>
      {isBidding ? < FinalModal /> : null}
    </>
  )
}

export default ModalContainer