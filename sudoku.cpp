#include <iostream>
#include <stack>

using namespace std;

#define N 9

struct Cell {
    int row, col, num;
};

class SudokuSolver {
private:
    stack<Cell> stk;

    bool isSafe(int grid[N][N], int row, int col, int num) {
        // Check row
        for (int i = 0; i < N; i++) {
            if (grid[row][i] == num) {
                return false;
            }
        }

        // Check column
        for (int i = 0; i < N; i++) {
            if (grid[i][col] == num) {
                return false;
            }
        }

        // Check 3x3 grid
        int startRow = row - row % 3, startCol = col - col % 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    bool findEmptyCell(int grid[N][N], int &row, int &col) {
        for (row = 0; row < N; row++) {
            for (col = 0; col < N; col++) {
                if (grid[row][col] == 0) {
                    return true;
                }
            }
        }
        return false;
    }

public:
    void printGrid(int grid[N][N]) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                cout << grid[i][j] << " ";
            }
            cout << endl;
        }
    }

    bool solveSudoku(int grid[N][N]) {
        int row, col;

        if (!findEmptyCell(grid, row, col)) {
            return true; // Sudoku is solved
        }

        for (int num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
                grid[row][col] = num;
                Cell cell = {row, col, num};
                stk.push(cell);

                if (solveSudoku(grid)) {
                    return true;
                }

                // Backtrack
                grid[row][col] = 0;
                stk.pop();
            }
        }

        return false; // No solution found
    }
};

int main() {
    SudokuSolver solver;

    int grid[N][N] = {
        {3, 0, 6, 5, 0, 8, 4, 0, 0},
        {5, 2, 0, 0, 0, 0, 0, 0, 0},
        {0, 8, 7, 0, 0, 0, 0, 3, 1},
        {0, 0, 3, 0, 1, 0, 0, 8, 0},
        {9, 0, 0, 8, 6, 3, 0, 0, 5},
        {0, 5, 0, 0, 9, 0, 6, 0, 0},
        {1, 3, 0, 0, 0, 0, 2, 5, 0},
        {0, 0, 0, 0, 0, 0, 0, 7, 4},
        {0, 0, 5, 2, 0, 6, 3, 0, 0}
    };

    if (solver.solveSudoku(grid)) {
        solver.printGrid(grid);
    } else {
        cout << "No solution exists" << endl;
    }

    return 0;
}
