import { useFormContext } from "react-hook-form";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import {
  Bold20DarkGray,
  Bold20Transparent,
  Regular12AppColor,
  Regular16Black,
} from "../../../../../../components/Text/Text";
import GrayBox from "../../../../../../components/Box/GrayBox";
import { EachReservationField, ReservationGrid } from "./styles";
import { FormValues } from "../../../../../../interfaces/DataInterfaces";
import styled from "@emotion/styled";
import { Common } from "../../../../../../styles";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../../../../../Recoil/OrderAtomState";

export function ReservationInfo() {
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
              {...register("reservationInfo.reservationNameKR", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationNameKR}
            />
            {errors.reservationInfo?.reservationNameKR && (
              <Regular12AppColor>이름을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField>
            <Bold20DarkGray>생년월일</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="19990101"
              {...register("reservationInfo.reservationBirthday", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationBirthday}
            />
            {errors.reservationInfo?.reservationBirthday && (
              <Regular12AppColor>생년월일을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField>
            <Bold20DarkGray>영문 이름</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="이름"
              {...register("reservationInfo.reservationFirstNameEN", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationFirstNameEN}
            />
            {errors.reservationInfo?.reservationFirstNameEN && (
              <Regular12AppColor>영문 이름을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>
          <EachReservationField>
            <Bold20DarkGray>영문 성</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="성"
              {...register("reservationInfo.reservationLastNameEN", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationLastNameEN}
            />
            {errors.reservationInfo?.reservationLastNameEN && (
              <Regular12AppColor>영문 성을 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>

          <EachReservationField>
            <Bold20DarkGray>전화번호</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="82"
              {...register("reservationInfo.reservationPhoneCode", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationPhoneCode}
            />
          </EachReservationField>
          <EachReservationField>
            <Bold20Transparent>전화번호</Bold20Transparent>
            <StyledInputField
              type="text"
              placeholder="01012345678"
              {...register("reservationInfo.reservationPhoneNumber", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationPhoneNumber}
            />
            {errors.reservationInfo?.reservationPhoneNumber && (
              <Regular12AppColor>전화번호를 입력해주세요</Regular12AppColor>
            )}
          </EachReservationField>

          <EachReservationField>
            <Bold20DarkGray>이메일</Bold20DarkGray>
            <StyledInputField
              type="text"
              placeholder="example@example.com"
              {...register("reservationInfo.reservationEmail", {
                required: true,
              })}
              error={!!errors.reservationInfo?.reservationEmail}
            />
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
}

export const StyledInputField = styled.input<{ error?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid
    ${({ error }) => (error ? Common.colors.appColor : Common.colors.gray2)};
  border-radius: 0.5rem;
  padding: 1.25rem 1.125rem;
  background-color: ${Common.colors.white};
  outline: 0;
  :focus {
    border: 1px solid ${Common.colors.black};
  }
`;
