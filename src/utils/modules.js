import { useSpring } from "@react-spring/web";

//for any string frist Letter Capitalize
export const fristLetterCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


//GMT time to local Time converter
export const timeCoverterGMTtoLocal = (GMTtime) => {
    let localTime = new Date(GMTtime).toLocaleString();
    return localTime; 
}
 
//price and profit calculation 
export const calculateFinalPriceAndProfit = (costPrice, sellPrice, discountPercent) => {

    const discountAmount = (sellPrice * discountPercent) / 100; 
    const finalPrice = (sellPrice - discountAmount); 
    const profit = finalPrice - costPrice; 

    return {finalPrice, profit, discountAmount};

}


export const animatedProps = (value) =>
    useSpring({
      number: value,
      from: { number: 0 },
      config: { duration: 1500 },
    });