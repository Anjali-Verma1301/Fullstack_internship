
package library;

import java.util.List;
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        Library library = new Library();
        boolean running = true;

        while (running) {
            System.out.println("\n=== LIBRARY MANAGEMENT SYSTEM ===");
            System.out.println("1. Add New Book");
            System.out.println("2. View All Books");
            System.out.println("3. Search Books");
            System.out.println("4. Register Member");
            System.out.println("5. View All Members");
            System.out.println("6. Borrow Book");
            System.out.println("7. Return Book");
            System.out.println("8. View Library Statistics");
            System.out.println("9. Exit");
            System.out.print("Enter your choice: ");

            String choice = scanner.nextLine().trim();

            try {
                switch (choice) {
                    case "1" -> addBook(library);
                    case "2" -> library.displayAllBooks();
                    case "3" -> searchBooks(library);
                    case "4" -> registerMember(library);
                    case "5" -> library.displayAllMembers();
                    case "6" -> borrowBook(library);
                    case "7" -> returnBook(library);
                    case "8" -> library.displayStatistics();
                    case "9" -> {
                        running = false;
                        System.out.println("Thank you for using the library system!");
                    }
                    default -> System.out.println(
                            "Invalid choice. Please enter a number from 1 to 9.");
                }
            } catch (Exception e) {
                System.out.println("Operation failed: " + e.getMessage());
            }
        }

        scanner.close();
    }

    private static void addBook(Library library) {
        String isbn = readRequired("Enter ISBN: ");
        String title = readRequired("Enter title: ");
        String author = readRequired("Enter author: ");
        int year = readInt("Enter publication year: ");

        if (year < 1 || year > java.time.Year.now().getValue()) {
            System.out.println("Please enter a valid publication year.");
            return;
        }

        library.addBook(new Book(isbn, title, author, year));
    }

    private static void searchBooks(Library library) {
        String keyword = readRequired("Enter title, author, or ISBN to search: ");
        List<Book> results = library.searchBooks(keyword);

        if (results.isEmpty()) {
            System.out.println("No matching books found.");
        } else {
            results.forEach(System.out::println);
        }
    }

    private static void registerMember(Library library) {
        String id = readRequired("Enter member ID: ");
        String name = readRequired("Enter member name: ");

        library.registerMember(new Member(id, name));
    }

    private static void borrowBook(Library library) {
        String isbn = readRequired("Enter book ISBN: ");
        String memberId = readRequired("Enter member ID: ");

        library.borrowBook(isbn, memberId);
    }

    private static void returnBook(Library library) {
        String isbn = readRequired("Enter book ISBN: ");
        String memberId = readRequired("Enter member ID: ");

        library.returnBook(isbn, memberId);
    }

    private static String readRequired(String prompt) {
        while (true) {
            System.out.print(prompt);
            String value = scanner.nextLine().trim();

            if (!value.isEmpty()) {
                return value;
            }

            System.out.println("Input cannot be empty. Please try again.");
        }
    }

    private static int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            String value = scanner.nextLine().trim();

            try {
                return Integer.parseInt(value);
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid whole number.");
            }
        }
    }
}
