import styled from "styled-components";

export const Manager = styled.div`
  padding: 25px 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
`;

export const Name = styled.div`
  margin: 10px;
  text-align: left;
  font-size: 17px;
  font-weight: 700;
`;

export const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Inquiry = styled.div`
  display: flex;
  align-items: center;
  color: #f184a1;
  white-space: nowrap;

  &.icon {
    padding-right: 4%;
  }
`;

export const Text = styled.div`
  margin: 10px 10px 10px 5px;
  font-weight: 600;
  font-size: 15px;
`;

export const Info = styled.div`
  color: #343a40;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
`;
