import { timeCoverterGMTtoLocal } from "../../../utils/modules";

const TransactionView = ({transaction}) => {
    const {_id , createdAt, TxID, card_issuer,card_brand, ssl_error, couponCode, currency, currency_amount, discount, due, email, name, phone, payment, paymentMethod, payment_status, totalPrice, totalQuantity,tran_date, order_status, card_issuer_country, card_type, risk_title, val_id, verify_sign} = transaction; 
    return  (
        <div className="container mx-auto p-4">
          <div className={`bg-gray-100 border ${payment_status==='VALID' ? 'border-green-500' : 'border-red-500'} dark:bg-gray-800 shadow-md rounded-lg p-6`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="md:text-2xl text-xl font-semibold text-gray-700 dark:text-gray-200">Transaction Details</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                payment_status === 'VALID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {payment}
              </span>
            </div>
    
            {/* Transaction Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID:</span>
                  <p className="text-gray-800 dark:text-gray-200">{TxID}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Time:</span>
                  <p className="text-gray-800 dark:text-gray-200">{timeCoverterGMTtoLocal(tran_date)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</span>
                  <p className="text-gray-800 dark:text-gray-200">{_id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                  <p className="text-gray-800 dark:text-gray-200">{name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                  <p className="text-gray-800 dark:text-gray-200">{email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone:</span>
                  <p className="text-gray-800 dark:text-gray-200">{phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Coupon Code:</span>
                  <p className="text-gray-800 dark:text-gray-200 uppercase">{couponCode ? couponCode : 'N/A'}</p>
                </div>
              </div>
    
              {/* Column 2 */}
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid Amount (Currency):</span>
                  <p className="text-gray-800 dark:text-gray-200">{`${currency_amount} ${currency}`}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Card Issuer:</span>
                  <p className="text-gray-800 dark:text-gray-200">{card_brand} {card_issuer} ({card_type})</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Issuer Country:</span>
                  <p className="text-gray-800 dark:text-gray-200">{card_issuer_country}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Discount:</span>
                  <p className="text-gray-800 dark:text-gray-200">{discount ? `${discount}` : 'No Discount'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Due:</span>
                  <p className="text-gray-800 dark:text-gray-200">{due}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Status:</span>
                  <p className="text-gray-800 dark:text-gray-200">{order_status}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Created:</span>
                  <p className="text-gray-800 dark:text-gray-200">{timeCoverterGMTtoLocal(createdAt)}</p>
                </div>
              </div>
            </div>
    
            {/* Divider */}
            <div className="my-6 border-t dark:border-gray-600"></div>
    
            {/* Payment Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method:</span>
                  <p className="text-gray-800 dark:text-gray-200">{paymentMethod}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Price:</span>
                  <p className="text-gray-800 dark:text-gray-200">{totalPrice}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Quantity:</span>
                  <p className="text-gray-800 dark:text-gray-200">{totalQuantity}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Title:</span>
                  <p className="text-gray-800 dark:text-gray-200">{risk_title ? risk_title : 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Validation ID:</span>
                  <p className="text-gray-800 dark:text-gray-200">{val_id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Verification Sign:</span>
                  <p className="text-gray-800 dark:text-gray-200">{verify_sign}</p>
                </div>
                {ssl_error && <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Error:</span>
                  <p className="text-gray-800 dark:text-gray-200">{ssl_error}</p>
                </div>}
              </div>
            </div>
    
            {/* Footer Buttons */}
            <div className="flex justify-end mt-6">
              <button className="btn btn-sm btn-primary mr-2">Download Receipt</button>
              <button className="btn btn-sm btn-secondary">Close</button>
            </div>
          </div>
        </div> )
        // this design make by ChatGPT
};

export default TransactionView;