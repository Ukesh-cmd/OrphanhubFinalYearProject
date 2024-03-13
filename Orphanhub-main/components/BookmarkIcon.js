import React from 'react';


const BookmarkIcon = ({ bookmarked, onClick }) => (
    <svg
        className={`bookmark-icon ${bookmarked ? 'bookmarked' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        onClick={onClick}
    >
        <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 3.29 1.54L12 17.27l5.71 3.27A2 2 0 0 0 19 19V5a2 2 0 0 0-2-2H7zm3 0v12l5-2.86L16 15V5H8z" />
        <style jsx>{`
            .bookmark-icon {
                width: 29px;
                height: 32px;
                fill: white;
                stroke: black;
                border-color:
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                transition: fill 0.3s ease;
            }

            .bookmark-icon.bookmarked {
                fill: red;
            }
        `}</style>
    </svg>
);

export default BookmarkIcon;