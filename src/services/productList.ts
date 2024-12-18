import { ProductListType } from "@/type/ProductType";
import { Dispatch, SetStateAction } from "react";

export const selectCategory = (
  categoryName: string,
  setProductList: Dispatch<SetStateAction<ProductListType[] | undefined>>,
  data: { data: ProductListType[] }
) => {
  switch (categoryName) {
    case "list":
      return setProductList(data.data);
    case "가방":
      return setProductList(
        data.data.filter((item) => item.category === "가방")
      );

    case "시계":
      return setProductList(
        data.data.filter((item) => item.category === "시계")
      );

    case "상의":
      return setProductList(
        data.data.filter((item) => item.category === "상의")
      );

    case "하의":
      return setProductList(
        data.data.filter((item) => item.category === "하의")
      );

    case "나이키":
      return setProductList(
        data.data.filter((item) => item.category === "나이키")
      );

    case "아디다스":
      return setProductList(
        data.data.filter((item) => item.category === "아디다스")
      );

    case "카메라":
      return setProductList(
        data.data.filter((item) => item.category === "카메라")
      );

    case "주얼리":
      return setProductList(
        data.data.filter((item) => item.category === "주얼리")
      );

    default:
      return setProductList(data.data);
  }
};
