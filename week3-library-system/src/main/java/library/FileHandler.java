
package library;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class FileHandler {

    private final Path dataDirectory = Path.of("data");
    private final Path booksFile = dataDirectory.resolve("books.txt");
    private final Path membersFile = dataDirectory.resolve("members.txt");
    private final Path loansFile = dataDirectory.resolve("loans.txt");

    private String encode(String value) {
        return Base64.getEncoder().encodeToString(
                value.getBytes(StandardCharsets.UTF_8));
    }

    private String decode(String value) {
        return new String(
                Base64.getDecoder().decode(value),
                StandardCharsets.UTF_8);
    }

    private void ensureDataDirectory() throws IOException {
        Files.createDirectories(dataDirectory);
    }

    // ==================== BOOK METHODS ====================

    public void saveBooks(List<Book> books) {
        try {
            ensureDataDirectory();

            List<String> lines = new ArrayList<>();

            for (Book book : books) {
                lines.add(
                        encode(book.getIsbn()) + "\t"
                        + encode(book.getTitle()) + "\t"
                        + encode(book.getAuthor()) + "\t"
                        + book.getYear() + "\t"
                        + book.isAvailable()
                );
            }

            Files.write(booksFile, lines, StandardCharsets.UTF_8);
            System.out.println("Books saved successfully.");

        } catch (IOException e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }

    public List<Book> loadBooks() {
        List<Book> books = new ArrayList<>();

        if (!Files.exists(booksFile)) {
            return books;
        }

        try {
            for (String line : Files.readAllLines(
                    booksFile, StandardCharsets.UTF_8)) {
                try {
                    String[] parts = line.split("\t", -1);

                    if (parts.length != 5) {
                        System.out.println("Skipping invalid book record.");
                        continue;
                    }

                    Book book = new Book(
                            decode(parts[0]),
                            decode(parts[1]),
                            decode(parts[2]),
                            Integer.parseInt(parts[3])
                    );

                    book.setAvailable(Boolean.parseBoolean(parts[4]));
                    books.add(book);

                } catch (IllegalArgumentException e) {
                    System.out.println("Skipping a corrupted book record.");
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading books: " + e.getMessage());
        }

        return books;
    }

    // ==================== MEMBER METHODS ====================

    public void saveMembers(List<Member> members) {
        try {
            ensureDataDirectory();

            List<String> lines = new ArrayList<>();

            for (Member member : members) {
                StringBuilder borrowed = new StringBuilder();

                for (String isbn : member.getBorrowedBooks()) {
                    if (borrowed.length() > 0) {
                        borrowed.append(",");
                    }
                    borrowed.append(encode(isbn));
                }

                lines.add(
                        encode(member.getId()) + "\t"
                        + encode(member.getName()) + "\t"
                        + borrowed
                );
            }

            Files.write(membersFile, lines, StandardCharsets.UTF_8);
            System.out.println("Members saved successfully.");

        } catch (IOException e) {
            System.out.println("Error saving members: " + e.getMessage());
        }
    }

    public List<Member> loadMembers() {
        List<Member> members = new ArrayList<>();

        if (!Files.exists(membersFile)) {
            return members;
        }

        try {
            for (String line : Files.readAllLines(
                    membersFile, StandardCharsets.UTF_8)) {
                try {
                    String[] parts = line.split("\t", -1);

                    if (parts.length != 3) {
                        System.out.println("Skipping invalid member record.");
                        continue;
                    }

                    Member member = new Member(
                            decode(parts[0]),
                            decode(parts[1])
                    );

                    if (!parts[2].isEmpty()) {
                        for (String isbn : parts[2].split(",")) {
                            member.borrowBook(decode(isbn));
                        }
                    }

                    members.add(member);

                } catch (IllegalArgumentException e) {
                    System.out.println("Skipping a corrupted member record.");
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading members: " + e.getMessage());
        }

        return members;
    }

    // ==================== LOAN METHODS ====================

    public void saveLoans(List<Loan> loans) {
        try {
            ensureDataDirectory();

            List<String> lines = new ArrayList<>();

            for (Loan loan : loans) {
                lines.add(
                        encode(loan.getIsbn()) + "\t"
                        + encode(loan.getMemberId()) + "\t"
                        + loan.getBorrowDate() + "\t"
                        + loan.getDueDate() + "\t"
                        + (loan.getReturnDate() == null
                            ? ""
                            : loan.getReturnDate())
                );
            }

            Files.write(loansFile, lines, StandardCharsets.UTF_8);
            System.out.println("Loans saved successfully.");

        } catch (IOException e) {
            System.out.println("Error saving loans: " + e.getMessage());
        }
    }

    public List<Loan> loadLoans() {
        List<Loan> loans = new ArrayList<>();

        if (!Files.exists(loansFile)) {
            return loans;
        }

        try {
            for (String line : Files.readAllLines(
                    loansFile, StandardCharsets.UTF_8)) {
                try {
                    String[] parts = line.split("\t", -1);

                    if (parts.length != 5) {
                        System.out.println("Skipping invalid loan record.");
                        continue;
                    }

                    Loan loan = new Loan(
                            decode(parts[0]),
                            decode(parts[1]),
                            LocalDate.parse(parts[2]),
                            LocalDate.parse(parts[3])
                    );

                    if (!parts[4].isEmpty()) {
                        loan.setReturnDate(LocalDate.parse(parts[4]));
                    }

                    loans.add(loan);

                } catch (RuntimeException e) {
                    System.out.println("Skipping an invalid loan record.");
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading loans: " + e.getMessage());
        }

        return loans;
    }
}
