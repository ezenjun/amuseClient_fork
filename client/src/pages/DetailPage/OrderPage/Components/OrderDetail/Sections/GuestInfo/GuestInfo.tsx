import React from "react";
import { useForm, SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues } from "../../../../../../../interfaces/DataInterfaces";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import {
  Bold20DarkGray,
  Bold20Transparent,
  Regular12AppColor,
  Regular16Black,
} from "../../../../../../../components/Text/Text";
import GrayBox from "../../../../../../../components/Box/GrayBox";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../../../../../../Recoil/OrderAtomState";
import {
  EachReservationField,
  ReservationGrid,
} from "../ReservationInfo/styles";
import { StyledInputField } from "../ReservationInfo/ReservationInfo";

const GuestInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const selectedItem = useRecoilValue(selectedItemState);

  return (
    <DetailSectionContainer>
      <SubHeader>
        예약자 정보 &nbsp;<Regular16Black>(필수)</Regular16Black>
      </SubHeader>
      <GrayBox verticalPadding={42} horizontalPadding={30}>
        <ReservationGrid>
          <EachReservationField>
            <Bold20DarkGray>예약자</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="이름"
              {...register("guestInfo.guestNameKR", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestNameKR}
            />
            {errors.guestInfo?.guestNameKR && (
              <Regular12AppColor>이름을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField>
            <Bold20DarkGray>생년월일</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="19990101"
              {...register("guestInfo.guestBirthday", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestBirthday}
            />
            {errors.guestInfo?.guestBirthday && (
              <Regular12AppColor>생년월일을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField>
            <Bold20DarkGray>영문 이름</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="이름"
              {...register("guestInfo.guestFirstNameEN", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestFirstNameEN}
            />
            {errors.guestInfo?.guestFirstNameEN && (
              <Regular12AppColor>영문 이름을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField>
            <Bold20DarkGray>영문 성</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="성"
              {...register("guestInfo.guestLastNameEN", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestLastNameEN}
            />
            {errors.guestInfo?.guestLastNameEN && (
              <Regular12AppColor>영문 성을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>

          <EachReservationField>
            <Bold20DarkGray>전화번호</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="82"
              {...register("guestInfo.guestPhoneCode", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestPhoneCode}
            />
          </EachReservationField>
          <EachReservationField>
            <Bold20Transparent>전화번호</Bold20Transparent>
            <StyledInputField
              type="text"
              placeholder="01012345678"
              {...register("guestInfo.guestPhoneNumber", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestPhoneNumber}
            />
            {errors.guestInfo?.guestPhoneNumber && (
              <Regular12AppColor>전화번호를 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>

          <EachReservationField>
            <Bold20DarkGray>이메일</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="example@example.com"
              {...register("guestInfo.guestEmail", {
                required: true,
              })}
              error={!!errors.guestInfo?.guestEmail}
            />
            {errors.guestInfo?.guestEmail && (
              <Regular12AppColor>이메일을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField></EachReservationField>
          {selectedItem.itemType === "Hotel" && (
            <EachReservationField className="fullWidth">
              <Bold20DarkGray>여권번호</Bold20DarkGray>
              <StyledInputField
                type="text"
                placeholder="123456789"
                {...register("guestInfo.guestPassportNumber", {
                  required: true,
                })}
                error={!!errors.guestInfo?.guestPassportNumber}
              />
              {errors.guestInfo?.guestPassportNumber && (
                <Regular12AppColor>여권번호를 입력해주세요</Regular12AppColor>
              )}
            </EachReservationField>
          )}
        </ReservationGrid>
      </GrayBox>

      {/* {showInfoModal && <InfoModal setInfoModal={setInfoModal} />} */}
    </DetailSectionContainer>
  );
};

export default GuestInfo;
