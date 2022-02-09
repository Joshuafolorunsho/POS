export interface Store {
   storeName: string;
   storePhone: string;
   storeAddress: string;
   storeEmail: string;
   storeID: string;
}

export interface DateAnalyticsFormat {
   from: string;
   to: string | null;
   cfrom: string;
   cto: string | null;
}

export interface SupplierProps {
   supplierName: string;
   supplierID: string;
}

export interface supplyManagerProps {
   supplierID: string;
   firstName: string;
   lastName: string;
}

export interface RequestItemProps {
   fee: string;
   expectedDeliveryDate: string;
   vendorName: string;
   edd: string | null;
   additionalFee?: string;
   additionalNote?: string;
   discount: string;
   productCount: string;
   requestCode: string;
   requestID: string;
   requestStatus: string;
   requestedAt: string;
   vat: string;
   wht: string;
   store: Store;
   totalAmount: string;
   supplier?: SupplierProps;
   supplyManager?: supplyManagerProps;
}

export interface RequestItemFormDataProps {
   fee: string;
   vendorNameWithID?: string;
   additionalNote: string;
   vat: string;
   wht: string;
   edd: Date;
   store: string;
   discount: string;
   requestItems: RequestItemWithProductNameAndID[];
}
export interface RequestItemViewDataProps {
   store: string;
   additionalFee: string;
   additionalNote: string;
   vat: string;
   wht: string;
   expectedDeliveryDate: string | null;
   requestStatus: string;
   itemSupplyStatus: string;
   discount: string;
   requestCode: string;
   totalAmount: string;
   requestItems: RequestItemWithSeperateProductNameAndID[];
}

export interface RequestItemWithProductNameAndID {
   productNameWithID: string;
   qty: string;
   unit: string;
   unitPrice: string;
}

export interface RequestItemWithSeperateProductNameAndID {
   selected?: boolean;
   productName: string;
   itemID: string;
   productID: string;
   itemSupplyStatus: string;
   qty: string;
   qtySupplied: string;
   unit: string;
   unitPrice: string;
}

export interface RequestProps {
   requestItems: RequestItemWithProductNameAndID[];
   fee: string;
   additionalFee?: string;
   additionalNote: string;
   requestCode: string;
   requestStatus: string;
   vat: string;
   totalAmount: string;
   discount: string;
}

export interface TransactionProps {
   transactionID: string;
   productCount: string;
   time: string;
   totalPrice: string;
   amountPaid: string;
   transactionStatus: string;
}

// WAREHOUSE MANAGEMENT
export interface WarehouseProduct {
   productName: string;
   productWarehouseID: string;
   costPrice: string;
   dateSupplied: string;
   qtyRequested: string;
   qtySupplied: string;
   unit: string;
   updatedAt: string;
}

export interface Store {
   storeID: string;
   storeName: string;
   storeAddress: string;
   storePhone: string;
   storeEmail: string;
   manager: {
      managerID: string;
      firstName: string;
      lastName: string;
   };
}

export interface MoveProductToInventoryPayload {
   unitQty: string;
   qtytoMove: string;
   sellingPrice: string;
}

export interface MoveProductToInventoryParams {
   productWarehouseID: string;
   payload: MoveProductToInventoryPayload;
}

// PRODUCT MANAGEMENT

export interface ProductCategories {
   "categoryID": string,
   "categoryName": string,
   "slug": string,
   "subCategory": string[]
}


export interface ProductBank {
   productID: string;
   productName: string;
   productDetail: string,
   productCategory: string;
   productBrand: string;
   productImg: string;
   productTags: string[];
   restockCount: string;
   sku: string;
   lastModified: string;
}

export interface WarehouseProduct {
   productName: string;
   productWarehouseID: string;
   costPrice: string;
   dateSupplied: string;
   qtyRequested: string;
   qtySupplied: string;
   unit: string;
   updatedAt: string;
}

export interface EditProductPricePayload {
   regularPrice: string;
   onSales: boolean;
   salesPrice: string;
}

export interface EditProductPriceParams {
   productInventoryID: string;
   payload: EditProductPricePayload;
}

export interface salesItems {
   productID: string;
   price: string;
   quantity: number;
}

export interface CreatePurchasePayload {
   cashPaid: string;
   change: number;
   paymentMethod: string;
   totalPrice: number;
   storeID: string | string[];
   discount: string;
   additionalFee: string;
   salesItems: salesItems[];
}

export interface CreatePurchaseParams {
   salesRepID: string;
   payload: CreatePurchasePayload;
}

// SALES MANAGEMENT
interface SalesAnalytics {
   salesCount: number;
   grossSales: number;
   netSales: number;
   totalCost: number;
   comparedSaleTransactions: {
      allComparedSales: AllSales[];
   };
}

interface AllSales {
   totalSales: number;
   salesDate: string;
   salesTime: string;
}

export interface SalesAnalyticsResponse extends SalesAnalytics {
   compare: SalesAnalytics;
   saleTransactions: {
      allSales: AllSales[];
   };
}
