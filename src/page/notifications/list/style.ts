import styled from "styled-components";

export const Page = styled.div`
  background: linear-gradient(180deg, #e9e6fe 40%, #ffffff 70%);
  min-height: 100vh;
`;

export const Main = styled.main`
  padding: 5rem 12.5rem;
  max-width: 80rem;
  margin: 0 auto;
  min-height: calc(100vh - 3.75rem);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #1f2937;

    &::placeholder {
      color: #9ca3af;
    }
  }

  img {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

export const NoticeTable = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 3fr 1fr 1.2fr 0.8fr;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;

  span {
    text-align: center;

    &:nth-child(2) {
      text-align: left;
    }
  }
`;

interface TableRowProps {
  isLast: boolean;
}

export const TableRow = styled.div<TableRowProps>`
  display: grid;
  grid-template-columns: 0.8fr 3fr 1fr 1.2fr 0.8fr;
  padding: 1rem 1.5rem;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #f3f4f6")};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;
  color: #1f2937;

  &:hover {
    background-color: #f9fafb;
  }

  span {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(2) {
      text-align: left;
      justify-content: flex-start;
      font-weight: 500;
    }
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface ArrowButtonProps {
  direction: "left" | "right";
}

export const ArrowButton = styled.button<ArrowButtonProps>`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

export const Pages = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface PageButtonProps {
  active: boolean;
}

export const PageButton = styled.button<PageButtonProps>`
  background: ${(props) => (props.active ? "#7c3aed" : "white")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  border: 1px solid ${(props) => (props.active ? "#7c3aed" : "#e5e7eb")};
  border-radius: 0.375rem;
  width: 2rem;
  height: 2rem;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#6d28d9" : "#f9fafb")};
    border-color: ${(props) => (props.active ? "#6d28d9" : "#d1d5db")};
  }
`;
