import React, { useEffect, useState } from "react";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import { fontFamily } from "../../shared/styles/theme";
import styled from "styled-components";
import {
  getSubscriptions,
  subscribe,
} from "../../../services/subscriptions/subscriptions-services";
import { Plans } from "./Plans";
import Swal from "sweetalert2";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import { useNavigate } from "react-router-dom";

export const ChoosePlan = () => {
  const [subscriptions, setSubscriptions] = useState();
  const [isMonthly, setSelectedSubscriptionType] = useState(true);
  const [selected, setSelected] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.user?.user_type;
  const navigate = useNavigate();

  const handleChangeSubscriptionType = () => {
    setSelectedSubscriptionType(!isMonthly);
  };

  useEffect(() => {
    async function fetchData() {
      const subscriptionsResult = await getSubscriptions(
        userData ? userData?.token : null,
        isMonthly ? "monthly" : "yearly",
      );
      setSubscriptions(subscriptionsResult?.data?.result?.data);
    }

    fetchData();
  }, [isMonthly]);

  const handleSelect = async (id) => {
    setSelected(id);
    if (id == 1 || id == 4) {
      const result = await subscribe({ subscription_id: id });
      if (result?.status == 200) {
        Swal.fire({
          title: "Complete your profile",
          text: "Please, complete your profile",
          icon: "success",
          confirmButtonText: "Ok",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate("/register/freelancer/profile");
          }
        });
      }
    } else {
      navigate("/checkout-form", {
        state: {
          subscription_id: id,
        },
      });
    }

    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "Please, confirm to proceed",
    //   icon: "warning",
    //   confirmButtonText: "Yes",
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   showCancelButton: true,
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const result = await subscribe({ subscription_id: id });
    //     if (result?.status == 200) {

    //     }
    //   }
    // });
  };
  return (
    <div>
      {role === "freelancers" ? <FreelancerHeader /> : <BusinessHeader />}{" "}
      <Container>
        <SubscriptionTypeContainer>
          <SubscriptionTypeButton
            onClick={handleChangeSubscriptionType}
            style={{
              backgroundColor: isMonthly ? `#118AB2` : `transparent`,
              color: isMonthly ? `#FFFFFF` : `#000000`,
            }}
          >
            Monthly
          </SubscriptionTypeButton>
          <SubscriptionTypeButton
            onClick={handleChangeSubscriptionType}
            style={{
              backgroundColor: isMonthly ? `transparent` : `#118AB2`,
              color: isMonthly ? `#000000` : `#FFFFFF`,
            }}
          >
            Yearly
          </SubscriptionTypeButton>
        </SubscriptionTypeContainer>
        <SubscriptionPlansContainer>
          {subscriptions?.map((data, index) => {
            return (
              <Plans
                selected={selected}
                handleSelect={handleSelect}
                key={index}
                id={data?.id}
                planName={data?.plan}
                rate={`$${data?.rate}`}
                isRecommended={data?.is_recommended}
                inclusions={data?.subscription_inclusions}
              />
            );
          })}
        </SubscriptionPlansContainer>
      </Container>
    </div>
  );
};

const SubscriptionTypeContainer = styled.div`
  width: 220px;
  height: 67px;
  border-radius: 30px;
  padding: 8px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  margin-top: 100px;
  margin-left: 50px;
`;

const SubscriptionTypeButton = styled.button`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  width: 104px;
  height: 51px;
  border-radius: 30px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const SubscriptionPlansContainer = styled.div`
  text-align: start;
  margin-top: 103px;
  margin: ${deviceMargin.mobile}px;
  display: grid;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
    margin-top: 20px;
    display: grid;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: 50px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: ${gap}px;
  }

  @media (min-width: ${largeScreens}px) {
    margin: 50px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: ${gap}px;
  }
`;

const Container = styled.div`
  text-align: start;
  margin-top: 103px;
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
    margin-top: 0;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: 0px;
    margin-top: 0;
  }

  @media (min-width: ${largeScreens}px) {
    margin: 0px;
    margin-top: 0;
  }
`;
