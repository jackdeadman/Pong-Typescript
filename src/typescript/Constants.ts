namespace Pong {

  export namespace Constants {
      export namespace Colours {
      export const MENU_BACKGROUND = '#7E8F7C';
      export const GAME_BACKGROUND = '#000000';
      export const PITCH_COLOUR = '#FFFFFF';

      export const TITLE_COLOUR = '#FDF3E7';
      export const SCORE_COLOUR = '#FFFFFF';

      export const BALL_COLOUR = '#FF0000';
      export const PADDLE_COLOUR = '#0000FF';
    }

    export namespace Text {
      export const GAME_TITLE = 'Pong!';
      export const TITLE_SIZE = '60px';
      export const TITLE_FONT = 'Arial';

      export const GAME_SUBTITLE = 'Click to play...';
      export const SUBTITLE_SIZE = '32px';
      export const SUBTITLE_FONT = 'Arial';

      export const SCORE_SIZE = '60px';
      export const SCORE_FONT = 'Arial';
    }

    export namespace Game {
      // Score needed to win
      export const WINNING_SCORE = 5;

      // Pixels the players are from the edge
      export const PLAYER_PADDING = 40;

      // Paddle size
      export const PADDLE_WIDTH = 10;
      export const PADDLE_HEIGHT = 50;
      export const PADDLE_SPEED = 5;
    }

  }
}