/**
 * Model for naviation link structure
 */
export class NavListModel {

    /**
     * Menu icon
     */
    public Icon?: string;

    /**
     * Unique ID for template
     */
    public Id?: string;

    /**
     * Menu label
     */
    public Label: string;

    /**
     * Menu parameter
     */
    public Param?: object;

    /**
     * Navigation URL
     */
    public RouterURL: string;

    constructor(opts: NavListModel) {
      Object.assign(this, opts);
    }
}
