import React, { useContext, useEffect } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import cardContext from "../context/CardContext";


const Success = () => {
    const {setCardItem} = useContext(cardContext);

    useEffect(() => {
        setCardItem([]);
    }, [])

  return (
    <Result
      status="success"
      title="Ödeme Başarılı"
      subTitle="Siparişiniz Başarıyla Tamamlandı"
      extra={[
        <Button className=" bg-sky-600 text-white" type="primary" key="console">
          <Link to="/">Anasayfa</Link>
        </Button>,
        <Button key="buy">
            <Link to="/cart">Siparişlerim</Link>
        </Button>,
      ]}
    />
  );
};

export default Success;
