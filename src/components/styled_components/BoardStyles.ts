import styled from "styled-components";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .board-wrapper {
    opacity: .4;
    counter-reset: row column;
    font-size: 1rem;
    font-weight: 700;

    .board-row {
      counter-increment: row;
      
      &:last-child {
        .board-element {
          counter-increment: column;

          &::after {
            content: counter(column, upper-latin);
          }
        }
      }
      
      &::before {
        content: counter(row);
      }
      
      .board-element {
        .board-tile {
          position: relative;
          width: calc(1.4rem + 1vw);
          height: calc(1.4rem + 1vw);
          background-color: ${({ theme }) => theme.colors.gridBackground};
          border: 2px solid ${({ theme }) => theme.colors.tile_border};
          border-radius: 2px;
        }
        
        .ship-not-hit {
          background-color: ${({ theme }) => theme.colors.ship};
          cursor: pointer;
        }
        
        .ship-hit {
          background-color: #c86b85;

          &::after {
            content: '\\f00d';
            position: absolute;
            font-family: 'Font Awesome 5 Free', sans-serif;
            font-weight: 1000;
            font-size: 15px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .ship-sunk {
          background-color: #bbbbbb;

          &::after {
            content: '\\f00d';
            position: absolute;
            font-family: 'Font Awesome 5 Free', sans-serif;
            font-weight: 1000;
            font-size: 15px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .missed {
          background-color: #bce6eb;

          &::after {
            content: '\\f111';
            position: absolute;
            font-family: 'Font Awesome 5 Free', sans-serif;
            font-weight: 1000;
            font-size: 7px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .marked {
          background-color: ${({ theme }) => theme.colors.marked};
        }

        .marked-origin {
          background-color: ${({ theme }) => theme.colors.marked};

          &::after {
            content: '\\f0e2';
            position: absolute;
            font-family: 'Font Awesome 5 Free', sans-serif;
            font-weight: 1000;
            font-size: 13px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .valid {
          background-color: ${({ theme }) => theme.colors.valid};
        }

        .valid-origin {
          background-color: ${({ theme }) => theme.colors.valid};
        }

        .invalid {
          background-color: ${({ theme }) => theme.colors.invalid};
        }

        .invalid-origin {
          background-color: ${({ theme }) => theme.colors.invalid};
        }
      }
    }
  }

  .active {
    opacity: .8;

    .board-row {

      .board-element {

        .board-tile {

          &:hover {
            border: 2px solid #878891;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const Header = styled.h4`
  margin-top: .6rem;
  font-weight: 500;
  font-size: 1.3rem;
`;

export { BoardContainer, Header };