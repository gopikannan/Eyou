class PollsController < ApplicationController
  def new
  end

  def show

          @poll = Poll.find(params[:id])
	  @click = Click.where(:poll_id => params[:id], :user_id => current_user.id)
          if @click.count == 1 
                  @click = @click.first
                  @poll_value = @click.option 
          else
                  @poll_value = 0 
          end
          render :layout=>false
  end

  def create
          @poll = current_user.polls.build(params[:poll])
          if @poll.save
                  redirect_to root_path
          else
                  redirect_to(:back)
          end
  end

  def destroy
  end

  def blob
          @poll = Poll.find(params[:poll_id])
          @data_set = @poll.data_sets.find_by_date(get_date)
          respond_to do |format|
                  format.js
          end
  end

  def autocomplete
  	search = "%"+params[:q]+"%"
  	@suggestions = Poll.select("question,option1,option2").where("question like ? or option1 like ? or option2 like ?",search,search,search)   
    	respond_to do |format|
		format.js{render:json => @suggestions.to_json}
	end
  end

  def update
          @poll = Poll.find(params[:poll_id])
          @val = 0
          @poll.clicks.each {|x| @val += x.option}
          @clicks =  @poll.clicks.where(:created_at => Time.now.midnight..Time.now)
          @count =  @val
  end
end
