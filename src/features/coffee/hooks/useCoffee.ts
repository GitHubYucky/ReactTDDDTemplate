//import
import { useState } from 'react';
import type { Coffee } from '../type/coffee';

// useCoffees フック
export const useCoffee=() =>{
    // datas
  const [coffees, setCoffees] = useState(<Coffee[]>[]);
  // fetch error loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null); // ←ここが重要


    const fetchCoffees=async(type:string)=>{
       // loading
       setLoading(true);
       setError(null);

       try {
         // type に応じてエンドポイント変更
         // url だけで表現すべきだな

         const endpoint =
           type === 'hot' || type === 'iced'
             ? `https://api.sampleapis.com/coffee/${type}`
             : 'https://api.sampleapis.com/coffee/iced';

         const resp = await fetch(endpoint);
         // get res and setType
         const result:Coffee[] = await resp.json();

         // keyword フィルター
         // const filtered = keyword
         //   ? result.filter(item =>
         //       item.title.toLowerCase().includes(keyword.toLowerCase())
         //     )
         //   : result;

         setCoffees(result);
       } catch (err:any) {
         setError(err);
       } finally {
         setLoading(false);
       }
     }
     return { coffees, loading, error,fetchCoffees };

    }

