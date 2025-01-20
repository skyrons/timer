import styled from "styled-components";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;

    h1{
        font-size: 1.5rem;
        font-family: 'Roboto';

        color: ${(props) => props.theme['gray-100']}
    }
`;

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${(props) => props.theme['gray-600']};
            padding: 1rem 1.5rem;
            text-align: left;

            font-family: 'Roboto', monospace;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child{
                border-top-left-radius: 8px;
            }

            &:last-child{
                border-top-right-radius: 8px;
            }
        }

        td {
            background-color: ${(props) => props.theme['gray-700']};
            border-top: 4px solid ${(props) => props.theme['gray-800']};
            padding: 1rem 1.5rem;

            font-family: 'Roboto', monospace;
            font-size: 0.875rem;
            line-height: 1.6;
            color: ${(props) => props.theme['gray-300']};

            margin: 0.25rem;
        }
    }


`;