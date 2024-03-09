import { create } from 'zustand';
// persist nos permite guardar en el localStorage
import { persist } from 'zustand/middleware';

interface State {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    //rememberAddress
  };

  //Métodos
  setAddress: (shippingAddress: State['shippingAddress']) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      shippingAddress: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
      },

      setAddress: (shippingAddress: State['shippingAddress']) => {
        set({ shippingAddress });
      },

      clearAddress() {
        set({
          shippingAddress: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            postalCode: '',
            city: '',
            country: '',
            phone: '',
          },
        });
      },
    }),
    { name: 'address-storage' }
  )
);
