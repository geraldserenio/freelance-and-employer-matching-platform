import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HeadingSection, SubHeading } from "../../../shared/generic/headers";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { SubscriptionPlanCard } from "../../../shared/blocks/subscription-plans/SubscriptionPlanCard";
import { fontFamily } from "../../../shared/styles/theme";
import { getSubscriptions } from "../../../../services/subscriptions/subscriptions-services";

export const SubscriptionPlans = () => {
  const [subscriptions, setSubscriptions] = useState();
  const [isMonthly, setSelectedSubscriptionType] = useState(true);

  const handleChangeSubscriptionType = () => {
    setSelectedSubscriptionType(!isMonthly);
  };

  useEffect(() => {
    async function fetchData() {
      const subscriptionsResult = await getSubscriptions(
        null,
        isMonthly ? "monthly" : "yearly",
      );
      setSubscriptions(subscriptionsResult?.data?.result?.data);
    }

    fetchData();
  }, [isMonthly]);

  return (
    <SubscriptionPlansContainer>
      <HeadingSection>Subscription Plan</HeadingSection>
      <SubHeading>
        Choose a flexible pricing plan tailored to your needs, whether you’re a
        freelancer or business{" "}
      </SubHeading>
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
      <SubscriptionPlanCardContainer>
        {subscriptions?.map((data, index) => {
          return (
            <SubscriptionPlanCard
              key={index}
              planName={data?.plan}
              rate={`$${data?.rate}`}
              isRecommended={data?.is_recommended}
              inclusions={data?.subscription_inclusions}
            />
          );
        })}
      </SubscriptionPlanCardContainer>
    </SubscriptionPlansContainer>
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

  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
    margin-top: 0;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
    margin-top: 0;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
    margin-top: 0;
  }
`;

const SubscriptionPlanCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${gap + 20}px;
  margin-top: 50px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto;
    gap: ${gap + 20}px;
    padding: 10px;
    margin-top: 50px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 10px;
    margin-top: 50px;
    width: 100%;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 10px;
    margin-top: 50px;
    width: 100%;
  }
`;
