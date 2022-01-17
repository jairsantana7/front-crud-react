import React from "react";
import PromotionCard from "../Card/Card";
import useApi from "../utils/useApi";
import "./List.css";
import { useState } from "react";
import PromotionModal from "../Modal/Modal";

const PromotionList = ({ loading, error, promotions, refetch }) => {
  const [promotionId, setPromotionId] = useState(null);
  const [deletePromotions, deletePromotionsInfo] = useApi({
    method: "DELETE"
  });
  if (error) {
    return <div> Algo deu errado </div>;
  }

  if (promotions === null || deletePromotionsInfo.loading) {
    return <div>Carregando....</div>;
  }

  if (promotions.length === 0) {
    return <div> Nenhum resultado encontrado</div>;
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion, i) => (
        <PromotionCard
          key={i}
          promotion={promotion}
          onClickComments={() => {
            setPromotionId(promotion.id);
          }}
          onClickDelete={async () => {
            await deletePromotions({
              url: `promotions/${promotion.id}`
            });
            refetch();
          }}
        />
      ))}
      {loading && <div>Carregando mais promoções....</div>}

      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}
    </div>
  );
};

export default PromotionList;
